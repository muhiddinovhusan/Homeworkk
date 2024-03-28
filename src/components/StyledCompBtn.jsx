import React from 'react'
import styled from 'styled-components'

const StyledCompBtn = styled.button`
color :${(props)=> props.variant=== 'outline' ? '#fff':'danger' };
background-color : ${(props)=> props.variant=== 'outline' ? '#f40d08':'#fffa02' };
width : 70px;
border: none;
border-radius:4px;
height :33px;

`

export default StyledCompBtn