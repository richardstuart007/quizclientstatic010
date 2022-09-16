//
//  Libraries
//
import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
import MyFormikTextField from '../../components/controls/MyFormikTextField'
//
//  Common Sub Components
//
import QuizInfo from '../Common/QuizInfo'
//
//  Utilities
//
import { useSnapshot } from 'valtio'
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//
// Constants
//
const { URL_REGISTER } = require('../../services/constants.js')
const sqlClient = 'Quiz/Register'
//.............................................................................
//.  Data Input Fields
//.............................................................................
//
//  Initial Values
//
const initialValues = {
  name: '',
  fedid: '',
  email: '',
  password: ''
}
//.............................................................................
//.  Input field validation
//.............................................................................
const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email().required('Required'),
  password: Yup.string().required('Required')
})
//===================================================================================
function QuizRegister() {
  if (debugLog) console.log('Start QuizRegister')
  const CurrentPage = 'QuizRegister'
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const URL_BASE = snapShot.v_URL
  //
  // Form Message
  //
  const [form_message, setForm_message] = useState('')
  //...................................................................................
  //. Form Submit
  //...................................................................................
  const onSubmitForm = (values, submitProps) => {
    //
    //  Deconstruct values
    //
    const { name, email, password, fedid } = values
    //
    //  Post to server
    //
    const URL = URL_BASE + URL_REGISTER
    fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sqlClient: sqlClient,
        email: email,
        password: password,
        name: name,
        fedid: fedid
      })
    })
      .then(response => response.json())

      .then(user => {
        if (user.u_id) {
          setForm_message(`Data updated in Database with ID(${user.u_id})`)
          ValtioStore.v_Email = email
          ValtioStore.v_Name = name
          ValtioStore.v_PagePrevious = CurrentPage
          ValtioStore.v_Page = 'QuizSignin'
        } else {
          setForm_message('User not registered')
        }
      })
      .catch(err => {
        setForm_message(err.message)
      })
  }
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <>
      <Grid container>
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
            enableReinitialize
          >
            <Form>
              <Grid container spacing={2}>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <MyFormikTextField name='name' label='name' />
                </Grid>
                <Grid item xs={12}>
                  <MyFormikTextField
                    name='fedid'
                    label='Bridge Federation Id'
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyFormikTextField name='email' label='email' />
                </Grid>
                <Grid item xs={12}>
                  <MyFormikTextField name='password' label='password' />
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <Typography style={{ color: 'red' }}>
                    {form_message}
                  </Typography>
                </Grid>
                {/*.................................................................................................*/}
                <Grid item xs={12}>
                  <MyButton type='submit' text='Register' value='Submit' />
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Container>
      </Grid>
      <QuizInfo />
    </>
  )
}

export default QuizRegister
