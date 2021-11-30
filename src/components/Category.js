import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

export default function Category() {
  document.title = "Category"
  const { user } = useContext(Context)
 

  const [cats, setCat] = useState([])

  const [category_name, setCategoryName] = useState('')

  useEffect(() => {
    const user_id = user.userData.user_id
    const token = user.userData.token
    const get_category = async () => {
      const res = await axios.get(`/get_category?user_id=${user_id}&token=${token}`)
      setCat(res.data.categoryData)
      console.log(res)
    }
    get_category()
  }, [user])


  const AddCategory = async (e) => {
    e.preventDefault()
    const user_id = user.userData.user_id
    const token = user.userData.token
    
    if (category_name !== "") {
      try {
        const res = await axios.post("/add_category", {
          user_id,
          token,
          category_name
        });
        setCat(res.data.categoryData)
        e.target.reset()
        setCategoryName("")
      } catch (err) { }
    }
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-4 text-gray-800">Category</h1>

      <div className="row mb-4">

        <div className="col-lg-6">
          <form className="user" onSubmit={AddCategory}>
            <div className="form-group">
              <input type="text" className="form-control"
                placeholder="Type category name"
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>

            <button type="button" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="table-responsive-sm">
        <table className="table table-hover table-sm">
          <thead>
            <tr>
              <th scope="col">SL</th>
              <th scope="col">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {cats.map((c, i) => (
              <tr key={i}>
                <td>{i+1}</td>
                <td>{c.category_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  )
}
