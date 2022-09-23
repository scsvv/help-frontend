import { Button } from '@mui/material';
import { Formik, Field } from 'formik';
import React, {useState, useRef, createRef} from 'react';
import CanvasSignature from 'react-signature-canvas'

const Signature = React.forwardRef((props, ref) => (
    <div style={{ border: '1px solid black' }}>
      <CanvasSignature
        penColor="black"
        {...props}
        ref={ref}
      />
    </div>
  ))


const Sign = ({state, setState}) => {
    //const [state, setState] = useState({})
    const ref = React.createRef()
    const initial = {
      signature: null
    }
    return (
      <div>
        <Formik
          initialValues={initial}
          onSubmit={values => {
            const current = ref.current
            const data = current.toDataURL()
            const postData = { ...values, signature: data }
            setState({ ...postData })
          }}
        >
          {({ values, errors, touched, handleSubmit, setValues }) => (
            <form onSubmit={handleSubmit} className='w-min'>
              <label htmlFor="signature">
                <Field
                  name="signature"
                  render={props => <Signature {...props} ref={ref} />}
                  onMouseUp={e => {
                    setValues({
                      ...values,
                      [e.target.name]: e.target.toDataURL()
                    })
                  }}
                />
              </label>
              <Button type="submit">Submit</Button>
            </form>
          )}
        </Formik>
      </div>
    )
  };



export default Sign