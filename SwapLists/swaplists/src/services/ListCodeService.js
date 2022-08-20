import http from "../http-common";

class ListCodeService {

  //Get all lists for one user based on their ID. 
  //Returns a list of listcodes
  getUsersLists(userId){ 
    return http.get(`/listcode/${userId}`);
  }

  //listData is actually a listCode. 
  //Add list code to table
  addListCode(listData) {
    return http.post('/listcode', listData);
  }

  checkListCode(listid) {
    return http.get(`/listcode?listid=${listid}`)
  }

  //Parameter is a list code, which is actually named listID. 
  //Get all user emails that can see a certain list code. 
  //Returns a set of user emails.
  getUserEmails(listid){
    return http.get(`/email?listid=${listid}`)
  }

}

export default new ListCodeService();
