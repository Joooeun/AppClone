import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const Container =styled.View`
    flex:1;
    background-color:#ffffff;
    align-items:center;
    justify-content:center;
`;

const Loading = () => {
    return (
        <Container>
            <ActivityIndicator color="#ff8800" size="large"/>
        </Container>
    );
};

export default Loading;