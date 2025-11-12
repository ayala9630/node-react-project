import Axios from "axios"
import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import React from "react";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { InputNumber } from "primereact/inputnumber";
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { RadioButton } from "primereact/radiobutton";


const AddProd = ({ setProductDialog, productDialogFooter }) => {

  const token = useSelector(store => store.tokenSlice.token)

  const [name, setName] = useState("")
  const [descraption, setDescraption] = useState("")
  const [category, setCategory] = useState("other")
  const [tags, setTags] = useState([])
  const [quentity, setQuentity] = useState()
  const [price, setPrice] = useState()
  const [image, setImage] = useState()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);

  const message = useRef(null);
  const [disabled, setDisabled] = useState(false);


  const submitForm = async (e) => {
    const newProd = { name, descraption: descraption, category, tags, quentity, price, image };
    const { data } = await Axios.post("http://localhost:1234/api/products/add", newProd, { headers: { "Authorization": `Bearer ${token}` } })
    navigate("/products")
  }


  const load = async (e) => {
    e.preventDefault()
    const newProd = { name, descraption: descraption, category, tags, quentity, price, image };
    setLoading(true);
    try {
      const { data } = await Axios.post("http://localhost:1234/api/products/add", newProd, { headers: { "Authorization": `Bearer ${token}` } })
      message.current.show({ severity: "success", summary: 'Success', detail: 'Product added successfully', life: 1500 })
      setTimeout(() => {
        setProductDialog(false)
      }, 1000);
    } catch (error) {
      message.current.show({ severity: "error", summary: 'Error', detail: 'Forbbiden', life: 3000 })
    }
    setLoading(false);
    setDisabled(false)
  }

  const toast = useRef(null);
  return (
    <>
      <form onSubmit={load}>
        <div className="card flex justify-content-center" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <FloatLabel>
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="name">Name</label>
          </FloatLabel>
          <FloatLabel>
            <InputTextarea autoResize id="descraption" value={descraption} onChange={(e) => setDescraption(e.target.value)} rows={4} cols={25} required />
            <label htmlFor="descraption">Descraption</label>
          </FloatLabel>
          <div className="field">
            <label className="mb-3 font-bold">Category</label>
            <div className="formgrid grid">
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category1" name="category" value="guitars" onChange={(e) => setCategory(e.value)} checked={category === 'guitars'} />
                <label htmlFor="category1">Guitars</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category2" name="category" value="bow" onChange={(e) => setCategory(e.value)} checked={category === 'bow'} />
                <label htmlFor="category2">Bow</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category3" name="category" value="pianos" onChange={(e) => setCategory(e.value)} checked={category === 'pianos'} />
                <label htmlFor="category3">pianos</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category4" name="category" value="windInstrument" onChange={(e) => setCategory(e.value)} checked={category === 'windInstrument'} />
                <label htmlFor="category4">windInstrument</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category5" name="category" value="drums" onChange={(e) => setCategory(e.value)} checked={category === 'drums'} />
                <label htmlFor="category5">drums</label>
              </div>
              <div className="field-radiobutton col-6">
                <RadioButton inputId="category6" name="category" value="other" onChange={(e) => setCategory(e.value)} checked={category === 'other'} />
                <label htmlFor="category6">other</label>
              </div>
            </div>
          </div>
          <FloatLabel>
            <InputText id="tags" value={tags} onChange={(e) => setTags(e.target.value.split(" "))} />
            <label htmlFor="tags">Tags</label>
          </FloatLabel>
          <FloatLabel>
            <InputNumber id="quentity" value={quentity} onValueChange={(e) => setQuentity(e.value)} />
            <label htmlFor="quentity">quentity</label>
          </FloatLabel>
          <FloatLabel>
            <InputNumber id="price" value={price} onValueChange={(e) => setPrice(e.value)} required />
            <label htmlFor="price">price</label>
          </FloatLabel>
          <FloatLabel>
            <InputText id="image" value={image} onChange={(e) => setImage(e.target.value)} />
            <label htmlFor="image">image</label>
          </FloatLabel>
          <div className="flex gap-2">
            <Toast ref={message} position='top-center' />
            {productDialogFooter}
            <Button type='submit' label="ok" icon="pi pi-check" loading={loading} disabled={disabled} />
          </div>
        </div>
      </form>
    </>
  )
}

export default AddProd
