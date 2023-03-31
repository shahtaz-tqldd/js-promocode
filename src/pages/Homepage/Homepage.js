import React, { useEffect, useState } from 'react'
import { addToLS, getFromLS, removePromo } from '../../assets/localstorage/localstorage'
import { toast } from 'react-hot-toast'

const Homepage = () => {
  const [avaiablePromo, setAvailablePromo] = useState([])

  const [promoCode, setPromoCode] = useState('')
  const [promoDiscount, setPromoDiscount] = useState('')
  const [applyPromo, setApplyPromo] = useState('')

  const [added, setAdded] = useState(0)
  const [remove, setRemove] = useState(avaiablePromo?.length)

  const handlePromo = (event) => {
    event.preventDefault()
    addToLS(promoCode, promoDiscount)
    setAdded(added + 1)
    setPromoCode('')
    setPromoDiscount('')
  }

  useEffect(() => {
    const promo = getFromLS()
    setAvailablePromo(promo)
  }, [added, remove])

  const handleRemovePromo = (promo) => {
    removePromo(promo)
    setRemove(remove - 1)
  }

  const handleApplyPromo = (event) => {
    event.preventDefault()
    if (applyPromo) {
      const existPromo = avaiablePromo?.filter((promo) => promo?.promocode === applyPromo)
      console.log(existPromo)
      if (existPromo?.length) {
        toast.success(`${existPromo[0].discount}% Promo Applied`)
        handleRemovePromo(applyPromo)
      }
      else {
        toast.error("Promo doesn't exist!")
      }
    }
    setApplyPromo('')
  }
  return (
    <section className='flex gap-16 max-w-[1240px] mx-auto px-3 mt-10'>
      {/* FORMS */}
      <div className='bg-[#DFFFD8] lg:w-[30%] h-[330px] p-8 rounded-xl shadow-lg'>
        <h2 className='text-xl font-bold mb-6'>Add a new Promocode</h2>
        <form onSubmit={handlePromo} className='flex flex-col gap-3'>
          <input
            type="text"
            placeholder="Promo Code"
            className="input input-bordered w-full"
            required
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
          />
          <input
            type="number"
            placeholder="Disocunt (%)"
            className="input input-bordered w-full"
            value={promoDiscount}
            required
            onChange={(event) => setPromoDiscount(event.target.value)}
          />
          <button type='submit' className='btn normal-case text-white rounded-full mt-6'>Add Promo +</button>
        </form>
      </div>

      {/* RIGHT SIDE PART */}
      <div className='lg:w-[60%]'>

        {/* APPLY PROMO */}
        <div>
          <h1 className='text-xl mb-4 font-bold'>Apply Promo</h1>
          <form onSubmit={handleApplyPromo} className='flex gap-4'>
            <input
              type="text"
              placeholder="Promocode"
              className="input input-bordered w-[60%] required"
              value={applyPromo}
              onChange={(event) => setApplyPromo(event.target.value)}
            />
            <button type='submit' className='btn px-16 text-white normal-case'>Apply</button>

          </form>
        </div>

        {/* AVAILABLE PROMO TABLE */}
        {
          avaiablePromo?.length ?
            <div>
              <h1 className='text-xl mt-10 mb-4 font-bold'>Available Promo</h1>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  {/* head */}
                  <thead>
                    <tr>
                      <th></th>
                      <th>Promocode</th>
                      <th>Discount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      avaiablePromo?.map((promo, index) => <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{promo?.promocode}</td>
                        <td>{promo?.discount}%</td>
                        <td><button onClick={() => handleRemovePromo(promo?.promocode)} className='btn btn-sm btn-error rounded-md text-white normal-case text-xs'>Remove</button></td>
                      </tr>
                      )}

                  </tbody>
                </table>
              </div>
            </div>
            : <h1 className='text-xl text-error font-bold mt-10'>No Promo Available! <br /><span className='text-sm font-normal text-neutral'>Start adding new promo</span></h1>
        }
      </div>
    </section>
  )
}

export default Homepage
