//
// Libraries
//
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
//
//  Pages
//
import QuizControl from '../pages/QuizControl'
//
//  Common Components
//
import Layout from '../components/Layout/Layout'
//
//  Utilities
//
import { ValtioStore } from '../pages/ValtioStore'
//
//  Layout Theme
//
const theme = createTheme({})
//----------------------------------------------------------------------------
//- Main Line
//----------------------------------------------------------------------------
function App() {
  //
  //  Update Valtio store with URL and Server Name - LOCAL
  //
  ValtioStore.v_Server = 'LOCAL'
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout>
            <QuizControl />
          </Layout>
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  )
}

export default App
