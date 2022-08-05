import React, { useEffect, useState } from 'react'
import { ethers, utils } from 'ethers'

import { InputField, Navbar, Toast } from './components'
import abi from './contracts/Bank.json'

const initialState = {withdraw: '',deposit: '',bankName: ''}

const App = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [isBankOwner, setIsBankOwner] = useState(false)
  const [inputValue, setInputValue] = useState(initialState)
  const [bankOwnerAddress, setBankOwnerAddress] = useState(null)
  const [customerTotalBalance, setCustomerTotalBalance] = useState(null)
  const [currentBankName, setCurrentBankName] = useState(null)
  const [customerAddress, setCustomerAddress] = useState(null)
  const [bankBalance, setBankBalance] = useState(null)
  const [error, setError] = useState(null)

  // states for transaction toasts
  const [depositing, setDepositing] = useState(false)
  const [withdrawing, setWithdrawing] = useState(false)
  const [settingBankName, setSettingBankName] = useState(false)

  //destructure inputValue
  const { bankName, deposit, withdraw } = inputValue

  const contractAddress =  import.meta.env.VITE_CONTRACT_ADDRESS
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
      setError(error.message)
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
      setError(error.message)
    }
  }
  
  const setBankName = async (e) => {
    e.preventDefault()

    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)
        const txn = await bankContract.setBankName(utils.formatBytes32String(bankName))
        setSettingBankName(true)
        await txn.wait()

        setSettingBankName(false)
        setInputValue(prevFormData => ({ ...prevFormData, bankName: '' }))
        getBankName()
      } else {
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const getBankOwner = async () => {
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
      setError(error.message)
    }
  }

  const customerBalance = async () => {
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
      setError(error.message)
    }
  }

  const getBankBalance = async () => {
    try {
      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)

        const bankBalance = await bankContract.getBankBalance()
        setBankBalance(utils.formatEther(bankBalance))
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(prevFormData => ({ ...prevFormData, [e.target.name]: e.target.value }))
  }

  const depositMoneyHandler = async (e) => {
    if(!deposit || !deposit < 0) return alert('Please enter a valid value!')

    try {
      e.preventDefault()

      if(window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)
        const txn = await bankContract.depositMoney({ value: ethers.utils.parseEther(deposit) })
        setDepositing(true)
        await txn.wait()

        setDepositing(false)
        setInputValue(prevFormData => ({ ...prevFormData, deposit: '' }))
        customerBalance()
      } else {
        setError('Please install a MetaMask wallet to use our bank.')
      }
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const withdrawMoneyHandler = async (e) => {
    if(!withdraw) return alert('Please enter a valid value!')

    try {
      e.preventDefault();
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const bankContract = new ethers.Contract(contractAddress, contractABI, signer)

        let myAddress = await signer.getAddress()

        const txn = await bankContract.withdrawMoney(myAddress, ethers.utils.parseEther(withdraw))
        setWithdrawing(true)
        await txn.wait()

        setWithdrawing(false)
        setInputValue(prevFormData => ({ ...prevFormData, withdraw: '' }))
        customerBalance()
      } else {
        setError("Please install a MetaMask wallet to use our bank.")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
    getBankName()
    getBankOwner()
    customerBalance()
    getBankBalance()
  },[isWalletConnected])

  const clearError = () => setError(null)

  return (
    <div className=''>
      <div className='w-screen bg-white overflow-x-hidden'>
        {error && <Toast type='error' message={error} onClear={clearError} />}
        {depositing && <Toast message='Depositing funds.' />}
        {withdrawing && <Toast message='Withdrawing funds.' />}
        {settingBankName && <Toast message='Setting bank name' />}
        <Navbar isWalletConnected={isWalletConnected} />
        <main className='w-full grid place-items-center'>

          <div className='text-center text-xl font-semibold text-primary mt-4 mb-8'>
            {!currentBankName === ' ' && isBankOwner ?
            ( <h4>Setup the name of your bank!</h4>) : 
            (<h1>{currentBankName}</h1>)}
          </div>

          <h4 className='text-2xl'>Bank Balance: {bankBalance} ETH</h4>

          <form onSubmit={depositMoneyHandler} className='w-250 md:w-500 grid place-items-center gap-1 mt-4 mb-8'>
            <InputField type='text' label='Deposit ETH' name='deposit' value={inputValue.deposit} onChange={handleInputChange} placeholder='0.00 ETH' />
            <button type='submit' disabled={!inputValue.deposit} className='px-4 py-1 bg-secondary text-white border-1 hover:bg-white hover:border-secondary hover:text-secondary hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed'>
              Deposit
            </button>
          </form>
          
          <form onSubmit={withdrawMoneyHandler} className='w-250 md:w-500 grid place-items-center gap-1 mt-4 mb-8'>
            <InputField type='text' label='Withdraw ETH' name='withdraw' value={inputValue.withdraw} onChange={handleInputChange} placeholder='0.00 ETH' />
            <button type='submit' disabled={!inputValue.withdraw} className='px-4 py-1 bg-secondary text-white border-1 hover:bg-white hover:border-secondary hover:text-secondary hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed'>
              Withdraw
            </button>
          </form>

          <p className='flex flex-col items-center gap-1 text-secondary my-2'>
            Your Balance:
            <span className='text-xs sm:text-base md:text-xl font-semibold text-primary'>
              {customerTotalBalance}
            </span>
          </p>
          {isWalletConnected && <p className='flex flex-col items-center gap-1 text-secondary my-2'>
            Your Address:
            <span className='text-xs sm:text-base md:text-xl font-semibold text-primary'>
              {customerAddress}
            </span>
            </p>}
          <p className='flex flex-col items-center gap-1 text-secondary my-2'>
            Owner Address:
            <span className='text-xs sm:text-base md:text-xl font-semibold text-primary'>
              {bankOwnerAddress}
            </span>
          </p>


          {isBankOwner && 
          <form onSubmit={setBankName} className='w-250 md:w-500 grid place-items-center gap-1 mt-4 mb-8'>
            <InputField type='text' label='Bank Name' name='bankName' value={bankName} onChange={handleInputChange} placeholder='Set Bank Name' />
            <button type='submit' disabled={!inputValue.bankName} className='px-4 py-1 bg-secondary text-white border-1 hover:bg-white hover:border-secondary hover:text-secondary hover:-translate-y-1 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed'>
              Set Bank Name
            </button>
          </form>}
        </main>
      </div>
    </div>
  )
}

export default App