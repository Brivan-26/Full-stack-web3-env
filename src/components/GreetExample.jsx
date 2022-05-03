import {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import Greeter from '../blockchain/contracts/Greeter.sol/Greeter.json'
const GreetExample = () => {
    const [greetMessage, setGreetMessage] = useState("")
    const [contract, setContract] = useState(null)
    const [account, setAccount] = useState("")
    const contractAddress = "0xe7f1725e7734ce288f8367e1bb143e90bb3f0512"
    const getGreetMessage = async () => {
        const response = await contract.greet()
        setGreetMessage(response)
    }
    const initConnection = async () => {
        if(typeof window.ethereum !== "undefined"){
            const accounts = await window.ethereum.request({method: "eth_requestAccounts"})
            setAccount(accounts[0])
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const signer = provider.getSigner()
            setContract(new ethers.Contract(
                contractAddress,
                Greeter.abi,
                signer
            ))
        }else {
           console.log("Please install metamask to proceed.")
        }
    }

    useEffect(() => {
        initConnection()
       
    },[])

    return (
        <div>
            {account && <h1>Your wallet address is: {account}</h1>}
            {
                greetMessage.length <1 && <button onClick={getGreetMessage}>You wanna know what the contract says?</button>
            }
            {greetMessage.length>0 && <p>The Greet contract says: <b>{greetMessage}</b></p>}
        </div>
    )
}


export default GreetExample