# 토이프로젝트 "헤어샵 실시간 예약 시스템"
> firebase를 이용하여 실시간으로 반영되는 예약 시스템입니다. </br>
https://one-people-hairshop.netlify.app/

- 반응형 레이아웃
<table>
  <thead>
    <tr>
      <th>
        desktop
      </th>
      <th>
        tablet
      </th>
      <th>
        mobile
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <img width="789" height="300" alt="image" src="https://user-images.githubusercontent.com/78889402/198449309-85a98f70-de9f-41e4-b66d-be4fcd4cfe6e.png">
      </td>
      <td align="center">
          <img width="789" height="500" alt="image" src="https://user-images.githubusercontent.com/78889402/198449486-1e9b8cb1-c394-475a-bc7e-38eb3a04c8d9.png">
      </td>
      <td align="center">
          <img width="789" height="500" alt="image" src="https://user-images.githubusercontent.com/78889402/198449513-e24a0c91-7398-40b9-be94-7d643021bf7a.png">
      </td>
    </tr>
  </tbody>
</table>

## 1. 제작 기간
-  2022년 10월 21일(금) ~ 2022년 10월 28일(금) (개인프로젝트)

## 2. 사용 기술
- React
- TypeScript
- Redux-Toolkit
- Styled-component
- firebase
- 라이브러리 : datePicker, react-modal, react-icon

## 3. 헤어샵 예약 시스템 설명
- 1인 헤어샵이기에 각 날짜별로 한 시간당 한 손님만 예약 가능하고 예약상황은 실시간으로 반영됩니다. 
- '예약하기" 탭에서 날짜와 시간을 고른 후, 예약자 정보를 입력하면 예약됩니다.
- '예약확인" 탭에서 핸드폰번호를 입력하면 예약을 확인할 수 있습니다.


## 4. 핵심 문제 해결
### 4-1. firebase로 `예약기능` 구현하기
https://user-images.githubusercontent.com/78889402/198452282-3967fde0-de1d-4789-bf1d-d5abf60060ec.mov
- user가 날짜, 시간을 차례대로 누르면 예약자 정보를 입력하는 칸이 나옵니다.
- (날짜를 선택해주세요. -> 시간을 선택해주세요. -> 예약을 계속 진행해주세요.)
- 예를들어, 지금이 15시 30분이라면 10시~15시는 예약하지 못하도록 disable 처리하였고 스타일도 변경해 주었습니다.
- 또한 user가 11월 1일 13시에 예약을 했다면 다른 user는 해당 날짜의 해당 시간대를 예약하지 못하도록 disable 처리하였고 스타일도 변경해 주었습니다.
- '예약하기'버튼을 누르면 입력된 모든 정보들을 modal로 띄워서 다시한번 확인시켜줍니다.
- '확인'버튼을 누르면 예약정보가 firebase에 저장됩니다.
- 느낀점 : 예약 기능이 생각보다 신경 써야 할 부분이 많았습니다. 해당 날짜의 예약된 모든 시간을 예약하지 못하게 해야 하는데 처음에는 이 부분을 생각하지 못하고 하나의 시간만 받아오게 로직을 짰었습니다. 이후 반영이 하나만 된다는 버그를 발견했고 확장성을 고려하여 로직을 짬으로써 해결할 수 있었습니다.

<details>
<summary><b>코드보기: firebase에서 예약정보 가져오기</b></summary>
<div markdown="1">
  
~~~javascript
  const [reservedTime, setReservedTime] = useState<(string | undefined)[]>([]);

  // useEffect로 month, day, selectedTime 값이 바뀌었을 때 데이터를 불러오도록 했습니다.
  const getReservedTime = () => {
    const reserve = firestore.collection("reserve");

    //firebase의 데이터를 .get()로 가져왔습니다.
    reserve.get().then((docs) => {
      let bucketData = [] as (string | undefined)[][];
      let infoObjArr = [] as TotalInfoType[];
      docs.forEach((doc) => {
        infoObjArr = [...infoObjArr, { ...doc.data() }];
      });
  
      //선택한 날짜에 해당하는 예약 데이터가 있다면 thisDayInfo에 할당됩니다.
      const thisDayInfo = infoObjArr.filter(
        (info) => info.month === month && info.day === day
      );

      //thisDayInfo가 있다면 SelectedTime을 모두 빼서 ['11:00', '13:00']형식으로 totalSelectedTime에 할당해줍니다. 
      if (thisDayInfo) {
        const totalSelectedTime = thisDayInfo.map(
          (el, i) => thisDayInfo[i].selectedTime
        );

        //spread 연산자로 깊은복사를 해주며 bucketData에 할당해주고 이 데이터는 reservedTime의 값이 됩니다.
        bucketData = [...bucketData, totalSelectedTime];
        setReservedTime(bucketData[0]);
      }
    });
  };

  useEffect(() => {
    getReservedTime();
  }, [month, day, selectedTime]);

~~~
  
</div>
</details>

<details>
<summary><b>코드보기: 시간버튼 disabled 처리하기</b></summary>
<div markdown="1">
  
~~~javascript
  //예약된시간이 시간버튼의 시간과 같거나 or 지금의 시간보다 작을 때 disabledTime이 됩니다.
   const disabledTime = (buttonTime: string) => {
    const date = new Date();
    return (
      reservedTime.includes(buttonTime) ||
      (date.getMonth() + 1 === month &&
        date.getDate() === day &&
        date.getHours() > parseInt(buttonTime, 10))
    );
  };
 
  //disabledTime을 TimeButton에 넘겨줍니다.
   return (
    <TimeContainer>
      {TIME_BUTTON.map(({ id, time }) => (
        <TimeButton
          key={id}
          type="button"
          onClick={(e) => dispatch(clickTime((e.target as Element).innerHTML))}
          time={time}
          selectedTime={selectedTime}
          disabled={disabledTime(time)}
          disabledTime={disabledTime(time)}
        >
          {time}
        </TimeButton>
      ))}
    </TimeContainer>
  );
  
  //disabledTime이 true면 버튼 색상을 바꿔줍니다.
  const TimeButton = styled.button<{
  time: string;
  selectedTime?: string;
  reservedTime?: string;
  disabledTime?: boolean;
}>`
  ${({ disabledTime }) =>
    disabledTime &&
    css`
      color: #b8b8b8;
      border: 1px solid ${colors.grey};

      &:hover {
        color: #b8b8b8;
        background-color: ${colors.lightPink};
      }
    `}
  `;
  
~~~

</div>
</details>

<details>
<summary><b>코드보기: firebase에 예약정보 저장하기</b></summary>
<div markdown="1">

- redux-toolket에 저장되어있는 state값을 불러와 firebase에 저장했습니다.
  
~~~javascript
  const { month, day, selectedTime } = useSelector(
    (state: RootState) => state.date
  );
  const { name, number, selectedSort, request } = useSelector(
    (state: RootState) => state.info
  );

  const addUserInfo = () => {
    const reserve = firestore.collection("reserve");
    reserve.add({
      name,
      number,
      selectedSort,
      request,
      month,
      day,
      selectedTime,
    });
  };  
~~~
  
</div>
</details>



### 4-2. firebase로 `예약확인 기능` 구현하기
https://user-images.githubusercontent.com/78889402/198326300-9566b5e0-d727-4ee8-a65a-2770a50ab69f.mov
- user마다 핸드폰번호가 다르니 이것을 이용하여 예약확인 기능을 구현하였습니다.
- 예약할 때 등록한 핸드폰번호를 입력하면 내가 예약했던 정보들을 확인할 수 있습니다.
- 만약 번호가 조회가 되지 않는다면 '예약이 없습니다.'를 보여줍니다.

<details>
<summary><b>코드보기: 내 예약 확인하기</b></summary>
<div markdown="1">
  
~~~javascript
  const [searchNumber, setSearchNumber] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfoType | null>();
  const [noData, setNoData] = useState<string>();

  //번호를 입력한 후, '예약확인'버튼을 누르면 이 함수가 실행되면서 예약정보를 가져옵니다.
  const searchMyReserve = async (e: React.FormEvent<HTMLFormElement>) => {
    setNoData("");
    setUserInfo(null);
    e.preventDefault();
    const reserve = firestore.collection("reserve");
    const res = await reserve.get().then((userData) => userData);

    //입력된 번호와 일치하는 번호가 있다면 setUserInfo에 넣고 없다면 setNoData에 "예약이 없습니다."를 넣어 보여주게 됩니다.
    res.forEach((data) => {
      if (data.data().number === searchNumber) {
        const userInfoData = data.data() as UserInfoType;
        setUserInfo(userInfoData);
      } else {
        setNoData("예약이 없습니다.");
      }
    });
  }; 
~~~
  
</div>
</details>



## 5. 그 외 문제 해결
  
<details>
<summary>클릭된 시간버튼에 스타일 적용하기</summary>
<div markdown="1">

- <TimeButton> styled-componentd에 props로 time, selectedTime을 넘기고 
- <{time: string; selectedTime?: string;}> 타입지정 후
- time === selectedTime면 스타일 적용

~~~javascript
  ${({ time, selectedTime }) =>
    time === selectedTime &&
    css`
      color: ${colors.white};
      background-color: ${colors.darkPink};
      border: 1px solid ${colors.darkPink};
    `}
~~~

</div>
</details>
  

<details>
<summary>타입지정</summary>
<div markdown="1">

- props로 넘기는 함수 타입 지정
  
~~~javascript
 interface ModalDefaultType {
  closeModal: () => void;
}
~~~
  
- [["11:00","12:00", ... ]] or [[]] 타입지정
  
~~~javascript
let bucketData = [] as (string | undefined)[][];
~~~
  
- 객체의 key값은 모르지만 타입만 알 때 타입지정
  
~~~javascript
interface TotalInfoType {
  [key: number]: UserInfoType;
}
~~~
  

</div>
</details>


<details>
<summary>datapicker 타입지정</summary>
<div markdown="1">

- datapicker 라이브러리에 타입 지정을 처음해봐서 처음에는 헤멨습니다.
- [stack overflow](https://stackoverflow.com/questions/74153470/onchange-issue-in-react-datepicker-with-typescript)에 질문도 하며 해결하려고 노력했습니다.
- 해결하고 보니 `<Date | null>`타입만 적용해주면 되는 간단한 문제였지만 타입지정에 더욱 감을 잡을 수 있던 경험이었습니다.


</div>
</details>
  
<details>
<summary>핸드폰번호 유효성 검사</summary>
<div markdown="1">

~~~ javascript
  const fillInfo = () => {
    const numberRegExp = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    if (name === "" || number === "" || selectedSort === "") {
      window.alert("이름, 번호, 종류선택은 필수입니다.");
    } else if (!numberRegExp.test(number)) {
      window.alert("번호를 올바르게 입력해주세요.");
    } else {
      openModal();
    }
  };  
~~~ 


</div>
</details>


<details>
<summary>styled-component 중복된 스타일</summary>
<div markdown="1">

~~~javascript
const NameInput = styled.input`
  width: 80%;
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
  font-size: 18px;
  border: 3px solid ${colors.lightGrey};
`;

const NumberInput = styled(NameInput)`
  width: 80%;
  height: 35px;
  margin: 0px 10px;
  padding-left: 5px;
  font-size: 18px;
  border: 3px solid ${colors.lightGrey};
`;
~~~

</div>
</details>
  

### Reference

- 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
