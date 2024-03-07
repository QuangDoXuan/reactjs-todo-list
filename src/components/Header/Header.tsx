import ToDo from '../../assets/edit.png';
import './_index.scss';

export const Header = () => {
  return (
    <div className="header">
      <div className='header-container'>
        <div className='header-logo'>
          <img src={ToDo} alt=''/>
        </div>
        <div className='header-admin'>Quang Do Xuan</div>
      </div>
    </div>
  )
}
