import React, { useEffect, useState } from 'react';
import { HStack, Avatar, Text, VStack } from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';

const Message = ({ text, uri, user, name,deleteHandler,ms,sec}) => {

  const [formattedTime, setFormattedTime] = useState();
  useEffect(() => {
    const dateObject = new Date(sec + ms);
    const timeString = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit',hour12: true });
    setFormattedTime(timeString);
  }, [ms,sec]);

  return (
    <VStack  bg={user === 'me' ? '#cdcdcd' : 'white'} w={'50%'}  alignSelf={user === 'me' ? 'flex-end' : 'flex-start'} borderRadius={'base'} border={'0.1px solid black'} boxShadow={"0 0 0.1rem ##765dff"}  paddingY={'2'} padding={'2'}>
    {
        user==='other' &&
        <HStack position={'relative'} w={'full'}>
        <Avatar  position={'absolute'} left={'0'} top={'0'} h={'7'} w={'7'} src={uri}></Avatar>
        <Text  fontSize={'0.8rem'} color={'black'} top={'1'} left={'9'} fontWeight={'700'} textAlign={'center'} position={'absolute'} >{name}</Text>
        </HStack>
    }
    {
        user==='me' && 
        <HStack position={'relative'} w={'full'}>
        <Avatar position={'absolute'} right={'0'} top={'0'} h={'7'} w={'7'} src={uri}></Avatar> 
        <Text  fontSize={'0.8rem'} color={'black'} top={'1'} right={'9'} fontWeight={'700'} textAlign={'center'} position={'absolute'} >{name}</Text>
        <AiFillDelete color='red'  onClick={deleteHandler} ></AiFillDelete>
        </HStack>
    }
    <Text fontWeight={'550'} color={'black'} marginY={'1'} paddingTop={'4'} w={'full'}>{text}</Text>
    <Text fontSize={'0.9rem'} w={'full'} fontWeight={'400'} color={'black'} textTransform={'uppercase'} textAlign={'end'}>{formattedTime}</Text>
    </VStack>
  )
}

export default Message






