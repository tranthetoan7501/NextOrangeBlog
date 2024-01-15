export default function Count() {
  return (
    <div className=''>
      <h1 className='dark:text-white text-9xl text-center'></h1>
      <div className='border-blue-900 border-2 my-16'>
        <div className='text-yellow-600 text-9xl text-center pt-10'>100</div>
        <div className='text-white text-5xl text-center'>Ngày</div>
        <div className='flex text-white text-6xl px-64 py-10 justify-center'>
          <div className='w-16 text-center'>
            <div>10</div>
            <div className='text-lg text-center'>Giờ</div>
          </div>
          <div className='px-3 text-red-700'>:</div>
          <div className='w-16 text-center'>
            <div>10</div>
            <div className='text-lg text-center'>Phút</div>
          </div>
          <div className='px-3 text-red-700'>:</div>
          <div className='w-16 text-center'>
            <div>10</div>
            <div className='text-lg text-center'>Giây</div>
          </div>
        </div>
      </div>
    </div>
  );
}
