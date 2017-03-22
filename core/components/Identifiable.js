class Identifiable extends Component{
  constructor(id) {
    super();
    this.id = id || this.uid();
  }

  identify(id){
    return this.id==id;
  }

  uid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
