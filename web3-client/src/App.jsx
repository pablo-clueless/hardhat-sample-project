import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'
import { ThemeProvider } from '@mui/material'

import abi from './contracts/Bank.json'
import { InputField, Navbar, Toast } from './components'
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
        console.log('Account connected: ', account)
      } else {
        setError('Please install a MetaMask wallet to use our bank.')
        console.log('No MetaMask detected!')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Ethereum object not found, install Metamask.')
        setError('Please install a MetaMask wallet to use our bank')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Setting bank name...')
        await txn.wait()
        console.log('Bank name changed', txn.hash)
        getBankName()
      } else {
        console.log('Ethereum object not found, install Metamask.')
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Ethereum object not found, install MetaMask!')
        setError('Please install a MataMask wallet to use our bank!')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Retrieved balance', balance)
      } else {
        console.log('Ethereum object not found, install MetaMask!')
        setError('Please install a MetaMask wallet to use our bank!')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Depositing money...')
        await txn.wait()
        console.log('Deposited money... done', txn.hash)

        customerBalanceHandler()
      } else {
        console.log('Ethereum object not found, install MetaMask.')
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
      console.log(error)
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
        console.log('Provider signer...', myAddress)

        const txn = await bankContract.withdrawMoney(myAddress, ethers.utils.parseEther(inputValue.withdraw))
        console.log('Withdrawing money...')
        await txn.wait()
        console.log('Money withdrew... done', txn.hash)

        customerBalanceHandler()
      } else {
        console.log('Ethereum object not found, install MetaMask.')
        setError('Please install a MetaMask wallet to use our bank!')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    
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


        <InputField type='text' label='Deposit ETH' name='deposit' value={inputValue.deposit} onChange={handleInputChange} buttonText='Deposit' onSubmit={depositMoneyHandler} />
        <InputField type='text' label='Withdraw ETH' name='withdraw' value={inputValue.withdraw} onChange={handleInputChange} buttonText='Withraw' onSubmit={withdrawMoneyHandler} />
      </main>
    </ThemeProvider>
  )
}

export default App