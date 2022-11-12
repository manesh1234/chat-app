import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, HStack, Input, VStack } from "@chakra-ui/react";
import Message from "./Message";
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { app } from "./firebase";
import { FcGoogle } from 'react-icons/fc';
import { getFirestore, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';

const auth = getAuth(app);
const db = getFirestore(app);
const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
}
const logoutHandler = () => signOut(auth);

function App() {
    const [user, setUser] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const divForScroll = useRef(null);
 
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setMessage("");
            await addDoc(collection(db, "Messages"), {
                text: message,
                uid: user.uid,
                uri: user.photoURL,
                createdAt: serverTimestamp(),
                name: user.displayName,
            })
            divForScroll.current.scrollIntoView({ behaviour: "smooth" });
        }
        catch (error) {
            alert("error");
        }
    }
    useEffect(() => {
        const q = query(collection(db, "Messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });
        const unsubscibeForMessages = onSnapshot(q, (snap) => {
            setMessages(
                snap.docs.map((item) => {
                    const id = item.id;
                    return { id, ...item.data() };
                })
            );
        });
        return () => {
            unsubscribe();
            unsubscibeForMessages();
        };
    }, []);

    return (
        <Box bg={"red.50"}>
            {
                user ?
                    <Container h={"100vh"} bg={"white"}>
                        <VStack h={"full"} paddingY={"4"}>
                            <Button onClick={logoutHandler} colorScheme={"red"} w={"full"}>Logout</Button>
    
                            <VStack height={"full"} w={"full"} overflowY={"auto"} >
                                {
                                    messages.map(item => {
                                        return <Message key={item.id} user={item.uid === user.uid ? "me" : "other"} text={item.text} name={item.name} uri={item.uri} />
                                    })
                                }
                            </VStack>
                            <div ref={divForScroll}> </div>
                            <form onSubmit={submitHandler} style={{ "width": "100%" }}>
                                <HStack>
                                    <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder={"Enter a Message..."} />
                                    <Button colorScheme={"purple"} type={"submit"}>send</Button>
                                </HStack>
                            </form>
                        </VStack>
                    </Container>
                    : <VStack fontWeight={"extrabold"} h={"100vh"} justifyContent={"center"}>
                        <Button onClick={loginHandler} colorScheme={"facebook"}>Sign In With Google<FcGoogle style={{ "fontSize": "1.5rem", "marginLeft": "10px" }} /></Button>
                    </VStack>
            }
        </Box>
    );
}

export default App;
