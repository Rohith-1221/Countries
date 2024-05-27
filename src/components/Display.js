import React, { useState} from 'react';
import {Typography,Button,TextField, Box} from '@mui/material';
import axios from 'axios';

const Display=()=> {
  const [country, setCountry] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');
 
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
    "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Croatia",
    "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras",
    "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
    "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
    "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
    "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
    "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru",
    "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
    "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
    "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
    "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
    "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
    "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City",
    "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];


  const handleSearch = async() => {
    if (!text){
        alert("enter country name correctly.")
    };
    try{  
    axios.get(`https://restcountries.com/v3.1/name/${text}`)
      .then(response => {
        setCountry(response.data[0]);
      }).catch(error=>{
        console.log(error)
      })
    }catch(error) {
        console.log(error)
    };
  };


  const onTextChanged = (e) => {
    const value = e.target.value;
    setText(value);
    setCountry(null)
    if (value.length === 0) {
      setSuggestions([]);
    } else {
      const regex = new RegExp(`^${value}`, 'i');
      setSuggestions(countries.sort().filter(v => regex.test(v)));
    }
  };

  const suggestionSelected = (value) => {
    setText(value);
    setSuggestions([]);
  };

  return (
    <Box>
      <Typography variant='h2' className='text-white'>COUNTRY INFORMATION</Typography>
      
      <TextField  type='text' label="Search Country"  variant="filled" value={text} onChange={onTextChanged}  sx={{margin:'20px',width:'350px',backgroundColor:"white",borderRadius:"10px"}}  required/>
      <Button onClick={handleSearch} variant='contained' color='error' sx={{margin:'20px',width:'150px',height:"50px"}}>Search</Button>
      {suggestions.length > 0 && (
        <ul className="autocomplete-items">
          {suggestions.map((item) => (
            <li key={item} onClick={() => suggestionSelected(item)} style={{color:"white"}}>
              {item}
            </li>
          ))}
        </ul>
      )}
    
      {country && (
        <Box className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 cntdisplay'>
            <Box sx={{ padding: '20px'}} className='images'>
                <img src={country.flags.png} alt='...' className='cntimage'/>
                <img src={country.coatOfArms.png} alt='...' className='cntimage'/>
            </Box>
            <Box className="details">
                <Typography variant='h3' className='text-red-600'>{country.name.common}</Typography><br/>
                <Typography variant='h4' className='text-slate-600' >Capital:</Typography>      
                <Typography variant='h5' className='text-blue-700'>{country.capital ? country.capital[0] : 'N/A'}</Typography>        
                <Typography variant='h4' className='text-slate-600'>Region:</Typography>
                <Typography variant='h5' className='text-blue-700'>{country.region}</Typography>                
                <Typography variant='h4' className='text-slate-600'>Subregion:</Typography> 
                <Typography variant='h5' className='text-blue-700'>{country.subregion}</Typography>                
                <Typography variant='h4' className='text-slate-600'>Population:</Typography>
                <Typography variant='h5' className='text-blue-700'>{country.population.toLocaleString()}</Typography>                
                <Typography variant='h4' className='text-slate-600'>Area:</Typography>
                <Typography variant='h5' className='text-blue-700'>{country.area.toLocaleString()} km²</Typography>                
                <Typography variant='h4' className='text-slate-600'>Starting day of Week:</Typography>
                <Typography variant='h5' className='text-blue-700'>{country.startOfWeek}</Typography><br/>
            </Box>          
        </Box>
      )}
    </Box>
  );
}

export default Display;
