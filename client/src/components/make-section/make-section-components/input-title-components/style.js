import styled from 'styled-components';
import { flexBox } from '../../../../styles/styled-components/mixin';

export const TextInputWrap = styled.div`
  ${flexBox({direction: 'column', justifyContent: 'space-around'})};
  width: 100px;
  height: 44px;
  margin-left: 15px;
`;

export const Text = styled.div`
  width: 100px;
  height: 17px;
  color: #e8a20c;
`;

export const CanText = styled.div`
  width: 94px;
  height: 9px;
  color: ${(props) => props.color};
  font-weight: normal;
  text-align: center;
`;

export const Input = styled.input`
  width: 100px;
  height: 23px;
  border: none;
  background-color: #f6f6f6;
  outline: none;
  font-size: 16px;
`;

export const GenWrap = styled.div`
  ${flexBox({justifyContent: 'space-between', alignItems: 'center'})};
`;

export const TypeInput = styled.input`
  width: 80px;
  height: 23px;
  border: none;
  background-color: #f6f6f6;
  outline: none;
  font-size: 16px;
  &:hover {
    cursor: pointer;
  }
`;

export const GenInput = styled.input`
  width: 80px;
  height: 23px;
  border: none;
  background-color: #f6f6f6;
  outline: none;
  font-size: 16px;
`;

export const GenBtnWrap = styled.div`
  ${flexBox({direction: 'column', justifyContent: 'space-between'})};  
  width: 12px;
  height: 18px;
`;

export const GenBtn = styled.img`
  width: 12px;
  height: 6px;
  &:hover {
    cursor: pointer;
  }
`;

export const ValidationWrap = styled.div`
  ${flexBox({direction: 'column', alignItems: 'center'})};  
`;

export const ValidationBtn = styled.button`
  width: 94px;
  height: 34px;
  background-color: #f45452;
  color: white;
  border: none;
  border-radius: 11px;
  font-size: 18px;
  margin-left: 15px;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export const PeopleTypeSelect = styled.select`
  width: 93px;
  height: 23px;
  font-size: 15px;
  font-weight: normal;
  border: none;
  background-color: #f6f6f6;
  color: #888888;
  outline: none;
`;