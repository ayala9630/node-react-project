import Axios from "axios"
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "primereact/card";

const SingleProd = ({ id, addToBasket }) => {

  const token = useSelector(store => store.tokenSlice.token)
  const [product, setProduct] = useState()

  const fetchData = async () => {
    const { data } = await Axios.get(`http://localhost:1234/api/products/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
    setProduct(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!product) return <h1>Loading...</h1>
  const footer = (
    <>
      <div className="flex justify-content-between align-content-end	">
        <Button onClick={() => addToBasket(product._id)} icon="pi pi-shopping-cart" className="p-button-rounded" />
        <div className="font-bold">{`₪${product.price}`}</div>
      </div>
    </>
  );
  const subTitle = (
    <>
      <div className="flex align-items-center gap-2  justify-content-center	">
        <i className="pi pi-tag"></i>
        <span className="font-semibold">{product.category}</span>
      </div>
    </>
  )

  const title = (
    <div className="text-center">
      {product.name}
    </div>
  )
  return (
    <>
      <div className="card">
        <div className="flex flex-column md:flex-row">
          <Card title={title} subTitle={subTitle} footer={footer} className="md:w-25rem flex justify-content-start	">
            <p className="text-right">
              {product.descraption}
            </p>
          </Card>

          <div className="w-full md:w-2">
            <Divider layout="vertical" className="hidden md:flex">
              <b><img className="w-9 sm:w-4rem xl:w-6rem block xl:block m-0 border-round" src={`http://localhost:1234/logo.png`} /></b>
            </Divider>
            <Divider layout="horizontal" className="flex md:hidden" align="center">
              <b><img className="w-9 sm:w-4rem xl:w-6rem block xl:block m-0 border-round" src={`http://localhost:1234/logo.png`} /></b>
            </Divider>
          </div>
          <div className="w-full md:w-5 flex align-items-center justify-content-center py-5">
            <img className="w-9  xl:w-10rem shadow-2 block xl:block mx-auto border-round " src={`http://localhost:1234/${product.image}`} alt={product.name} />
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleProd
