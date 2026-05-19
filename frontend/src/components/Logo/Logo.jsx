import logo from '../../assets/logo.png'

function Logo({size = '36px'}) {
  return (
    <img src={logo} alt="logo" style={{width:`${size}`}}/>
  )
}

export default Logo