// import axios from "axios";
// import App from "../App";
// import { Select } from 'antd';
// import React from 'react';
// const { Option } = Select;
// const handleChange = (value) => {
//   console.log(`selected ${value}`);
// };

// const SelectCountryWrapper = () => {
//     return (
//       <>
//         <App>
//           <SelectCountry />
//         </App>
//       </>
//     );
// };

// const SelectCountry = () => {

//     const onFinish = async (event) => {
//         console.log("Success:", event);
//         const username = event.username;
//         const country = event.country;
    
//         await selectCountry(username, country);
//     };
    
//     const selectCountry = async (username, country) => {
//         const requestBody = {
//           //currentUser: currentUser,
//           username: username,
//           country: country,
//         };
//         axios
//           .post("http://localhost:2020/chooseCountry", requestBody)
//           .then((response) => {
//             message.success("Country " + country + "has been selected", 5);
//           })
//           .catch((error) => {
//             console.log("erorr ", error.message);
//             message.error("Unexpected Error occured" + error.response.message, 5);
//           });
//         };
//         const onFinishFailed = (errorInfo) => {
//             console.log("Failed:", errorInfo);
//         };
//         return(
//         <>
//             <Select
//                 //defaultValue="lucy"
//                 style={{
//                 width: 120,
//                 }}
//                 onChange={handleChange}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//             >
//             <Option value="Afghanistan">Afghanistan</Option>
//             <Option value="Åland Islands">Åland Islands</Option>
//             <Option value="Albania">Albania</Option>
//             <Option value="Algeria">Algeria</Option>
//             <Option value="American Samoa">American Samoa</Option>
//             <Option value="Andorra">Andorra</Option>
//             <Option value="Angola">Angola</Option>
//             <Option value="Anguilla">Anguilla</Option>
//             <Option value="Antarctica">Antarctica</Option>
//             <Option value="Antigua and Barbuda">Antigua and Barbuda</Option>
//             <Option value="Argentina">Argentina</Option>
//             <Option value="Armenia">Armenia</Option>
//             <Option value="Aruba">Aruba</Option>
//             <Option value="Australia">Australia</Option>
//             <Option value="Austria">Austria</Option>
//             <Option value="Azerbaijan">Azerbaijan</Option>
//             <Option value="Bahamas">Bahamas</Option>
//             <Option value="Bahrain">Bahrain</Option>
//             <Option value="Bangladesh">Bangladesh</Option>
//             <Option value="Barbados">Barbados</Option>  
    
      
//             <Option value="disabled" disabled>
//                 Disabled
//             </Option>
      
//             </Select>
//         </>
//     );
// };

// export default SelectCountryWrapper;