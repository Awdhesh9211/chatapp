
import './App.css';
import {BiSolidSend} from  'react-icons/bi';
import {
  Box ,
  Button, 
  Container,
  VStack,
  Input,
  Text, 
  HStack,
  Avatar} from "@chakra-ui/react"
import Message from './component/Message';
import {
  getAuth, 
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup, 
  signOut} from 'firebase/auth'
import {app} from "./firebase";
import { 
  useEffect, 
  useRef, 
  useState } from 'react';
import {
  getFirestore,
  addDoc, 
  collection, 
  serverTimestamp, 
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc} from 'firebase/firestore'

//login
const auth=getAuth(app)
const LoginHandler=()=>signInWithPopup(auth,new GoogleAuthProvider());
//logout
const logouthandler=()=>signOut(auth);




function App() {
//state definition
  const [user,setUser] =useState(false);
  const [message,setMessage]=useState("");
  const [messages,setMessages]=useState([]);
  const scrollDivRef = useRef(null);

//db
  const db=getFirestore(app);
  const q=query(collection(db,'Messages'),orderBy('createdAt','asc'));
  const collec=collection(db,'Messages');

//mounting process 
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(data)=>setUser(data));
    const unsubscribeMessage=onSnapshot(q,(snap)=>{
      setMessages(snap.docs.map((item)=>{const id=item.id;return {id,...item.data()};}))
      if(scrollDivRef.current) scrollDivRef.current.scrollIntoView({behavior:"smooth"});  
    });
    return()=>{unsubscribe();unsubscribeMessage();}
  },[])


//Adding chat into Firestore
  const submitHandler=async(e)=>{
  e.preventDefault() 
  try {
  const docSchema={text:message,name:user.displayName,uid:user.uid,uri:user.photoURL,createdAt:serverTimestamp()};
  await addDoc(collec,docSchema);
  setMessage("");
  if(scrollDivRef.current)scrollDivRef.current.scrollIntoView({behavior:"smooth"});
  } catch (error) {
  alert(error)
  }
  }

//Deleting chat from firestore 
  const deleteHandler = async (id) => {
  try {
    await deleteDoc(doc(collec, id)); 
  } catch (error) {
    console.error('Error deleting message:', error);
  }
  };

//Returning Component

  return (
    <Box bg={'#191825'} >
      {
        user?(
          <Container bg='#765dff' h={"100vh"}>
           <VStack h={'full'} >
            <HStack w={'full'} justifyContent={'space-between'}>
             <div 
             style={{
              display:'flex',
              alignItems:'center',
              gap:'0.3rem',
              color:'white',
              fontSize:'1rem'
             }}
             >
             <Avatar w={'2rem'} h={'2rem'} src={user.photoURL}></Avatar>
             <Text  >{user.displayName}</Text>
             </div>
              <Button onClick={logouthandler} colorScheme={'red'}  m={"0.4rem"} >
                Logout
              </Button>
              </HStack>
              <VStack h='full' w='full' bg={'white'} overflowY={'auto'} borderRadius={'10px'} padding={'1'}>
                {
                  messages.map(item=>(
                    <Message 
                    key={item.id}
                    name={item.uid === user.uid ? user.displayName : item.name}
                    user={item.uid === user.uid ? 'me' : 'other'}
                    text={item.text}
                    uri={item.uid === user.uid ? user.photoURL : item.uri}
                    sec={item.createdAt && item.createdAt.seconds ? item.createdAt.seconds * 1000 : 0}
                    ms={item.createdAt && item.createdAt.nanoseconds ? Math.round(item.createdAt.nanoseconds / 1e6) : 0}
                    deleteHandler={()=>deleteHandler(item.id)}
                    />
                  ))
                }
              
               <div ref={scrollDivRef}></div>  
              </VStack>

              <form onSubmit={submitHandler} style={{width:'100%'}}>
              <HStack >
              <Input value={message} bg={'white'}fontWeight={'600'} color={'black'} onChange={(e)=>setMessage(e.target.value)} placeholder='Enter a Message.....'/>
              <Button bg={'#765dff'} type='submit' zIndex={'0'} right={'0'}>  
               <BiSolidSend  
                style={{
                  color:'lightgreen',
                  width:'3rem',
                  height:'3rem',
                  zIndex:'1', 
                }}>
                </BiSolidSend>
                </Button>
                </HStack>
             </form>
          </VStack>
        </Container>
        ):(
          <VStack  bg={'#191825'} h={'100vh'} justifyContent={'center'}>
            <Button onClick={LoginHandler} colorScheme='whatsapp'>Sign In with Google</Button>
          </VStack>
        )
      }
    </Box>
  );
}

export default App;





