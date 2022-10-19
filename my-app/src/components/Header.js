import PropTypes from 'prop-types'
import Button from './Button'
const Header = ({title}) => {
    const onClick = () => {
        console.log('Component Button')
    }
    return(
        <header className="header">
            {/*<h1> Tasks</h1>
            <h1 style={{ color: 'red', background:'black' }}> Abc </h1>
            <h1 style={headingStyle}> Abc </h1>*/}
            <h1>{title}</h1>
            <Button text='Save'onClick = {onClick}/>
            {/*<Button text='Delete' color='red'/>*/}
        </header>
    )
}
Header.defaultProps = {
    title: "Task Default"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}


/*
const headingStyle = { 
    color: 'red', 
    background:'black' 
}*/
export default Header