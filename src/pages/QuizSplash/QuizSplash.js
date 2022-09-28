//
//  Libraries
//
import { useSnapshot } from 'valtio'
import { Container, Grid, Typography } from '@mui/material'
//
//  Debug Settings
//
import debugSettings from '../../debug/debugSettings'
//
//  Controls
//
import MyButton from '../../components/controls/MyButton'
//
//  Utilities
//
import { ValtioStore } from '../ValtioStore'
//..............................................................................
//.  Initialisation
//.............................................................................
//
// Debug Settings
//
const debugLog = debugSettings()
//===================================================================================
const QuizSplash = () => {
  if (debugLog) console.log('Start QuizSplash')
  //
  //  Define the ValtioStore
  //
  const snapShot = useSnapshot(ValtioStore)
  const CurrentPage = snapShot.v_Page
  //...................................................................................
  //.  Render the form
  //...................................................................................
  return (
    <Grid container>
      <Container>
        <Typography variant='h6' sx={{ marginTop: '8px', color: 'blue' }}>
          STATIC VERSION 010
        </Typography>
        <Typography variant='h6' sx={{ marginTop: '8px' }}>
          This product is in Trial/Development
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          It has been developed by Richard Stuart and is FREE to use/distribute.
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '8px' }}>
          Comments you can email me at richardstuart007@hotmail.com
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '32px', color: 'red' }}>
          PLEASE SWITCH TO THE DATABASE VERSION SO THAT YOU CAN SIGN IN AND HAVE A HISTORY OF YOUR
          QUIZZES
        </Typography>
        <Typography variant='h3' sx={{ marginTop: '8px' }}>
          <a href='https://richardstuart007.github.io/quizclient010/'>Database Version</a>
        </Typography>
        <Typography variant='subtitle2' sx={{ marginTop: '32px' }}>
          Alternatively click on the Continue button below to use the static version
        </Typography>
        {/*.................................................................................................*/}
        <Grid item xs={12}>
          <MyButton
            color='secondary'
            type='submit'
            text='Continue'
            value='Submit'
            onClick={() => {
              ValtioStore.v_PagePrevious = CurrentPage
              ValtioStore.v_Page = 'QuizRestart'
            }}
          />
        </Grid>
      </Container>
    </Grid>
  )
}

export default QuizSplash
