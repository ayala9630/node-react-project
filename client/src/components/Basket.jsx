
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { DataScroller } from 'primereact/datascroller';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';



const Basket = () => {
  const [totalSum, setTotalSum] = useState(0)
  const [products, setProducts] = useState([]);
  const token = useSelector(store => store.tokenSlice.token)
  const message = useRef(null);

  const navigate = useNavigate()

  const fetchdata = async () => {
    try {
      const { data } = await Axios.get("http://localhost:1234/api/basket/getByUserName", { headers: { "Authorization": `Bearer ${token}` } })
      setProducts(data)
      updateSum(data)
    } catch (error) {
      if (error.status === 403 || error.status === 401)
        navigate("/")
    }
  }

  const deleteItem = async (id) => {
    const { data } = await Axios.delete(`http://localhost:1234/api/basket/delete/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
    fetchdata()
  }

  const updateSum = (data) => {
    let sum = 0
    data.forEach(item => {
      sum = sum + (item.product.price * item.quentity)
    });
    setTotalSum(sum)
  }

  useEffect(() => {
    fetchdata()
  }, []);

  const updateQty = async (id, qty) => {
    const { data } = await Axios.put("http://localhost:1234/api/basket/updateQty", { id, quentity: qty }, { headers: { "Authorization": `Bearer ${token}` } })
    fetchdata()
  }


  const itemTemplate = (product, index) => {
    return (
      <div className="col-12" key={product.product.id} >
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-center p-4 gap-2', { 'border-top-1 surface-border': index !== 0 })}>
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1234/${product.product.image}`} alt={product.product.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.product.name}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.product.category}</span>
                </span>
              </div>
              <div className="flex align-items-center sm:align-items-end gap-3 sm:gap-2">
                <Button icon="pi pi-trash" outlined severity='danger' onClick={() => deleteItem(product.product._id)}></Button>
                <InputNumber inputId="minmax-buttons" value={product.quentity} onValueChange={(e) => updateQty(product._id, e.value)} mode="decimal" showButtons min={1} max={100} />
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">₪{product.product.price}</span>
            </div>

          </div>
        </div>
      </div>

    );
  };

  return (
    <>
      <h1>Total sum: {totalSum}</h1>
      <Toast ref={message} position='top-center' />

      <div className="card" style={{}}>
        <DataScroller value={products} itemTemplate={itemTemplate} rows={5} inline scrollHeight="500px" header="Shopping Cart" />
        <h2>כאן מופיעים כל המוצרים שכרגע נמצאים בעגלת הקניות שלכם</h2>
      </div>
    </>
  )
}

export default Basket
