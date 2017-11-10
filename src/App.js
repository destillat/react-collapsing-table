//React
import React, { Component } from 'react';
//Component
import Table from './components/Table';

class App extends Component {

  render() {
    const props = {
    table: {
      columns:{
        visible:[
          {accessor:'firstName',label:'First Name',priorityLevel:1,position:1,minWidth:150},
          {accessor:'lastName',label:'Last Name',priorityLevel:2,position:2,minWidth:150},
          {accessor:'email',label:'Email',priorityLevel:3,position:3,minWidth:250},
          {accessor:'address',label:'Address',priorityLevel:4,position:4,minWidth:150},
          {accessor:'bio',label:'Bio',priorityLevel:5,position:9,minWidth:300}
        ]
      ,hidden:[]
    },
    rows:{
        displayed:[
          {firstName:'Arch',lastName:'Lehner',email:'Ricardo_Vandervort@hotmail.com',address:'615 Heath Ports',city:'Leafort',state:'Maryland',country:'Wallis and Futuna',zipCode:'77401-4917',bio:'Placeat quis cum soluta vel sunt.',isOpen:false},
          {firstName:'Damien',lastName:'Moen',email:'Jacey73@gmail.com',address:'04766 Wintheiser Pines',city:'Emmaton',state:'Mississippi',country:'French Southern Territories',zipCode:'02718',bio:'Omnis reprehenderit consequuntur corrupti id velit architecto.',isOpen:false},
          {firstName:'Eric',lastName:'Torphy',email:'Cassidy_Stracke@yahoo.com',address:'26671 Marianne Passage',city:'Paucekton',state:'Alabama',country:'Puerto Rico',zipCode:'24365-3522',bio:'Aliquid eos repellendus magnam qui consequuntur dolore pariatur.',isOpen:false},
          {firstName:'Ollie',lastName:'Green',email:'Darian_Schamberger@hotmail.com',address:'849 Domenick Field',city:'East Ike',state:'North Carolina',country:'Mayotte',zipCode:'56662-9687',bio:'Unde non consectetur distinctio harum voluptate enim ipsam deserunt.',isOpen:false},
          {firstName:'Jeremie',lastName:'Shields',email:'Lysanne12@gmail.com',address:'65526 Swift Islands',city:'Jazmynebury',state:'Nevada',country:'Swaziland',zipCode:'38870',bio:'Possimus asperiores labore dolores et et sequi.',isOpen:false}
        ]
      }
    }
  }
    return (
      <Table { ...props } />
    );
  }
}

export default App;
