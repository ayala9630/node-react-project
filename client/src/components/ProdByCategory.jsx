import Axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import SingleProd from "./SingleProd"

const ProdByCategory = () => {

  const message = useRef(null);

  const [products, setProducts] = useState()
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState()


  const [layout, setLayout] = useState('grid');

  const token = useSelector(store => store.tokenSlice.token)
  const { name } = useParams()

  const fetchData = async () => {
    if (name === "all") {
      const { data } = await Axios.get(`http://localhost:1234/api/products`, { headers: { "Authorization": `Bearer ${token}` } })
      setProducts(data)
    }
    else {
      const { data } = await Axios.get(`http://localhost:1234/api/products/category/${name}`, { headers: { "Authorization": `Bearer ${token}` } })
      setProducts(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [name])

  const addToBasket = async (id) => {
    try {

      const exist = await Axios.get(`http://localhost:1234/api/basket/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
      if (exist.data.length === 0) {//לא קיים מוצר כזה
        const newItem = { product: id }
        const { data } = await Axios.post("http://localhost:1234/api/basket/add", newItem, { headers: { "Authorization": `Bearer ${token}` } })
      }
      else {//צריך לעדכן כמות
        const newQty = { id: exist.data[0]._id, quentity: exist.data[0].quentity + 1 }
        const add = await Axios.put("http://localhost:1234/api/basket/updateQty", newQty, { headers: { "Authorization": `Bearer ${token}` } })
      }
      message.current.show({ severity: "success", summary: 'Success', detail: 'Product added to cart', life: 3000 })
    } catch (error) {
      message.current.show({ severity: "error", summary: 'Error', detail: 'Please Login', life: 3000 })

    }

  }


  const listItem = (product, index) => {
    return (
      <div className="col-12" key={product.id}>
        <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
          <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1234/${product.image}`} alt={product.name} />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
              </div>
            </div>
            {selected === product._id &&
              <Dialog visible={visible} className="card" style={{ border: "solid 5px var(--indigo-300)", width: '50vw' }} onHide={() => { if (!visible) return; setVisible(false); }}>
                <SingleProd id={product._id} addToBasket={addToBasket} />
              </Dialog>}
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2 justify-content-between h-10rem">
              <span className="text-2xl font-semibold">₪{product.price}</span>

              <Button onClick={() => addToBasket(product._id)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
              <Button label="Show" icon="pi pi-external-link" className="bg-indigo-300 text-indigo-300" onClick={(e) => { setVisible(true); setSelected(product._id); }} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const gridItem = (product) => {
    return (
      <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 surface-border" key={product.id}>
        <div className="p-6 border-1 border-indigo-50	surface-card border-round flex-column justify-content-between h-full">
          <div className="flex flex-wrap align-items-center justify-content-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag"></i>
              <span className="font-semibold">{product.category}</span>
            </div>
          </div>
          <div className="flex flex-column align-items-center gap-3 py-5">
            <img className="w-9 shadow-2 border-round" src={`http://localhost:1234/${product.image}`} alt={product.name} />
            <div className="text-2xl font-bold">{product.name}</div>
          </div>
          <div className="flex align-items-center justify-content-between">
            <span className="text-2xl font-semibold">₪{product.price}</span>

            <Button label="Show" icon="pi pi-external-link" className="bg-indigo-300 text-indigo-300" onClick={(e) => { setVisible(true); setSelected(product._id); }} />
            {selected === product._id &&
              <Dialog className="card" style={{ border: "solid 5px var(--indigo-300)", width: '50vw' }} visible={visible} onHide={() => { if (!visible) return; setVisible(false); }}>
                <SingleProd id={product._id} addToBasket={addToBasket} />
              </Dialog>}
            <Button onClick={() => addToBasket(product._id)} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
          </div>
        </div>
      </div>
    );
  };

  const itemTemplate = (product, layout, index) => {
    if (!product) {
      return;
    }

    if (layout === 'list') return listItem(product, index);
    else if (layout === 'grid') return gridItem(product);
  };

  const listTemplate = (products, layout) => {
    return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product, layout, index))}</div>;
  };

  const header = () => {
    return (
      <div className="flex justify-content-end">
        <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
      </div>
    );
  };
  const footer = (
    <>
      <Button label="Save" icon="pi pi-check" />
      <Button label="Cancel" severity="secondary" icon="pi pi-times" style={{ marginLeft: '0.5em' }} />
    </>
  );


  return (
    <>
      <div className="card" style={{ display: "flex", justifyContent: "center" }}>
        <DataView style={{ width: "70%" }} value={products} listTemplate={listTemplate} layout={layout} header={header()} />
      </div>
      <Toast ref={message} position='bottom-center' />

    </>
  )
}

export default ProdByCategory
