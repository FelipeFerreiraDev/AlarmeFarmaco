import styled from 'styled-components/native';

export const Container = styled.View`
    margin-top: 15%;

    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
`;

export const Header = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
`;

export const Footer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
    width: 100%;
    margin-bottom: 5%;
    height: 8%;
`;

export const Button = styled.TouchableOpacity`
    background: #6C63FF;
    height: 100%;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
`;

export const Title = styled.Text`
    font-weight: bold;
    font-size: 30px;
`;