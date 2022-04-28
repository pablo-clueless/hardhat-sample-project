import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'
import { ThemeProvider } from '@mui/material'

import abi from './contracts/Bank.json'
import { InputField, Navbar, Text, Toast } from './components'
import { theme } from './theme'

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isBankOwner, setIsBankOwner] = useState(false)
  const [inputValue, setInputValue] = useState({ withdraw: '', deposit: '', bankName: ''})
  const [bankOwnerAddress, setBankOwnerAddress] = useState(null)
  const [customerTotalBalance, setCustomerTotalBalance] = useState(null)
  const [currentBankName, setCurrentBankName] = useState(null)
  const [customerAddress, setCustomerAddress] = useState(null)
  const [error, setError] = useState(null)

  const contractAddress = '0x2D4eaBAff69e6074b06B75A88098fD4f85BABf06'
  const contractABI = abi.abi

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        const account = accounts[0]
        setIsWalletConnected(true)
        setCustomerAddress(account)
      } else {
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
    }
  }

  const getBankName = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)

        let bankName = await bankContract.bankName()
        bankName = utils.parseBytes32String(bankName)
        setCurrentBankName(bankName.toString())
      } else {
        setError('Please install a MetaMask wallet to use our bank')
      }
    } catch (error) {
    }
  }
  
  const setBankNameHandler = async (e) => {
    e.preventDefault()

    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)
        const txn = await bankContract.setBankName(utils.formatBytes32String(inputValue.bankName))
        await txn.wait()
        getBankName()
      } else {

        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
    }
  }

  const getBankOwnerHandler = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)
         let owner = await bankContract.bankOwner()
         setBankOwnerAddress(owner)

         const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
         if (owner.toLowerCase() === account.toLowerCase()) {
           setIsBankOwner(true)
         }
      } else {
        setError('Please install a MataMask wallet to use our bank!')
      }
    } catch (error) {
    }
  }

  const customerBalanceHandler = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)

        let balance = await bankContract.getCustomerBalance()
        setCustomerTotalBalance(utils.formatEther(balance))
      } else {
        setError('Please install a MetaMask wallet to use our bank!')
      }
    } catch (error) {
    }
  }

  const handleInputChange = (e) => {
    setInputValue(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))
  }

  const depositMoneyHandler = async (e) => {
    try {
      e.preventDefault()

      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)
        const txn = await bankContract.depositMoney({ value: ethers.utils.parseEther(inputValue.deposit) })
        await txn.wait()

        customerBalanceHandler()
      } else {
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
    }
  }

  const withdrawMoneyHandler = async (e) => {
    try {
      e.preventDefault()

      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)

        let myAddress = await signer.getAddress()

        const txn = await bankContract.withdrawMoney(myAddress, ethers.utils.parseEther(inputValue.withdraw))
        await txn.wait()

        customerBalanceHandler()
      } else {
        setError('Please install a MetaMask wallet to use our bank!')
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    getBankName()
    getBankOwnerHandler()
    customerBalanceHandler()
  },[isWalletConnected])

  const clearError = () => setError(null)

  return (
    <ThemeProvider theme={theme}>
    <Navbar isWalletConnected={isWalletConnected} connectWallet={checkIfWalletIsConnected} />
      <main>
        
        <h1>Hello Web3</h1>
        <p>React + Etherjs + Solidity</p>
        
        {error && <Toast message={error} clearToast={clearError} />}

        <div>
          {currentBankName === '' && isBankOwner ?
          <p>Setup the name of your bank!</p> : <p>{currentBankName}</p>
          }
        </div>

        <InputField type='text' label='Deposit ETH' name='deposit' value={inputValue.deposit} onChange={handleInputChange} buttonText='Deposit' onSubmit={depositMoneyHandler} />
        <InputField type='text' label='Withdraw ETH' name='withdraw' value={inputValue.withdraw} onChange={handleInputChange} buttonText='Withraw' onSubmit={withdrawMoneyHandler} />

        <Text label='Customer Balance' content={customerTotalBalance} />
        <Text label='Bank Owner Address' content={bankOwnerAddress} />

        {isWalletConnected && <Text label='Your wallet address' content={customerAddress} />}

      </main>
    </ThemeProvider>
  )
}

export default App