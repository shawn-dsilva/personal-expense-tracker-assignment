import { Spinner } from './ui/spinner'

const LoadingSpinner = ({ className, message }) => {
    return (
        <div className={`flex flex-col items-center ${className}`} >
            <div className='m-auto flex flex-col items-center'>
                <Spinner className='size-8 m-3' />
                <span className='font-semibold'>{message}</span>
            </div>
        </div >
    )
}

export default LoadingSpinner