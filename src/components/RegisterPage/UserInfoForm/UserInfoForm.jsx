import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function UserInfoForm() {
  const user = useSelector((store) => store.user);
  const [userInfo, setUserInfo] = useState({});
  const [height, setHeight] = useState({});
  const dispatch = useDispatch();
  const heightInInches = height.feet * 12 + height.inches;
  const history = useHistory();

  function calculateBmr() {
    switch (userInfo.gender) {
      case 'Male':
        return (
          66 +
          6.23 * userInfo.weight /* in pounds*/ +
          12.7 * heightInInches /*in inches*/ -
          6.8 * userInfo.age /*in years*/
        );
      case 'Female':
        return (
          655 +
          4.35 * userInfo.weight /*in pounds*/ +
          4.7 * heightInInches /*in inches*/ -
          4.7 * userInfo.age /*in years*/
        );
      default:
        console.error('Invalid Gender');
        return null;
    }
  }

  const addUserInfo = (event) => {
    event.preventDefault();
    dispatch({
      type: 'ADD_USER_INFO',
      payload: {
        ...userInfo,
        user_id: user.id,
        height: heightInInches,
        bmr: Math.round(calculateBmr()),
      },
    });
    history.push('/home');
  }; // end registerUser

  return (
    <form
      onSubmit={addUserInfo}
      className='formPanel'
    >
      <label htmlFor='height'>Height: </label>
      <input
        id='height-feet'
        type='number'
        onChange={(e) => setHeight({ feet: Number(e.target.value) })}
        required
      />{' '}
      ft
      <input
        id='height-inches'
        type='number'
        onChange={(e) =>
          setHeight({ ...height, inches: Number(e.target.value) })
        }
        required
      />{' '}
      inches
      <br />
      <label htmlFor='weight'>Weight: </label>
      <input
        id='weight'
        type='number'
        onChange={(e) =>
          setUserInfo({ ...userInfo, weight: Number(e.target.value) })
        }
        required
      />{' '}
      <br />
      <label htmlFor='age'>Age: </label>
      <input
        id='age'
        type='number'
        onChange={(e) =>
          setUserInfo({ ...userInfo, age: Number(e.target.value) })
        }
        required
      />
      <br />
      <select
        name='gender'
        id='gender'
        onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
        required
      >
        <option value=''>Select your gender</option>
        <option value='Male'>Male</option>
        <option value='Female'>Female</option>
      </select>{' '}
      <br /> <br />
      <button className='btn'>Submit</button>
    </form>
  );
}
