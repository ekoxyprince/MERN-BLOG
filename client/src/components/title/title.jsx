import './title.css'

const Title = (props)=>{
  return(
    <div className='section__title'>
      <h3>{props.title}</h3>
      <span></span>
    </div>
  )
}


export default Title