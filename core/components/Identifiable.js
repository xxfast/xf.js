class Identifiable extends Component{
  constructor(id) {
    super();
    this.id = id;
  }
  identify(id){
    return this.id==id;
  }
}
