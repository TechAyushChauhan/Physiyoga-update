import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Home()
{
  return (
    <>
      <div className='flex bg-black items-center'>
        <nav className="w-auto flex-grow text-white flex justify-around h-9 items-center">

          <div className="cursor-pointer">Home</div>
          <div className="cursor-pointer">Contact</div>
          <div className="cursor-pointer">Insights</div>
          <div className="cursor-pointer">About</div>

        </nav>
        <div className='mr-4'>
          <AccountCircleIcon className='text-white' />
        </div>
      </div>
    </>
  );
}
export default Home