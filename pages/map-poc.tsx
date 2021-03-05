import Map from '@modules/Map'
import Navbar from '@modules/Navbar/Navbar'

const MapPoc = () => {
  return (
    <div>
      <Navbar />
      <Map onChange={address => console.log(address)} />
    </div>
  )
}

export default MapPoc
