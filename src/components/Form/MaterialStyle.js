let fieldWith = '300px';
let fieldHeight = '50px';

export default {
  root:{
    width: fieldWith,
    height: fieldHeight
  },
  select:{
    menuStyle:{
      marginTop: 0
    },
    label: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'pre',
      textAlign: 'left',
      height: fieldHeight
    },
    underlineStyle:{
    },
    iconStyle: {
      fill: '#333'
    }
  },
  wrapper: {
    regular: {
      position: 'relative',
      margin: '0 auto 5px',
      width: fieldWith
    },
    error: {
      position: 'relative',
      margin: '0 auto 5px',
      width: fieldWith,
      backgroundColor: '#fdebeb'
    }
  },
  errorStyle: {
    top: '2px'
  },
  underlineFocusStyle:{
    borderColor: '#00aeef',
    bottom: 0
  },
  underlineStyle:{
    borderColor: '#00aeef',
    bottom: 0
  },
  floatingLabelStyle: {
    regular:{
      top: '20px'
    },
    error:{
      top: '20px',
      color:'#ee3d38'
    }
  },
  inputStyle:{
    marginTop: 0
  }
};
