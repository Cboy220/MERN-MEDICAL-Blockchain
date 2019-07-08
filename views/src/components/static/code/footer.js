import React,{Component} from 'react';
import Footer from '../style/footer.css';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

class footer extends Component{
  render(){
    return(
              <footer id = 'hell'  class="page-footer font-small teal pt-4 this-is-footer">
                  <div class="container-fluid text-center text-md-left">
                      <div class="row">
                          <div class="col-md-6 mt-md-0 mt-3">
                              <h5 class="text-uppercase font-weight-bold">A guy is late for an important meeting</h5>
                              <p>But he can't find a place to park. In desperation,
                               he begins to pray. "Please Lord, if you help me find
                              a parking stall right now, I promise to go to church
                              every Sunday and never drink vodka again!" A moment later,
                              he sees a beautiful empty spot right next to the entrance.
                              "Never mind. Found one!"</p>
                          </div>

                          <hr class="clearfix w-100 d-md-none pb-3"/>
                              <div class="col-md-6 mb-md-0 mb-3">
                                  <h5 class="text-uppercase font-weight-bold">A man is walking through his local mall and notices a Mexican book store</h5>
                                      <p>He decides to go in because he has never
                                      seen a Mexican book store before. He browses
                                      through the store and finally asks the clerk,
                                     "Do you have the book on Donald Trump's foreign
                                     policies with Mexico?"The clerk replies,
                                     "F*ck you, get out, stay out!" The man replies,
                                     "Yeah, that's the one!"
                                      </p>
                               </div>
                  </div>
              </div>
              <div class="footer-copyright text-center py-3">© 2018 Copyright:
                  <a href="#"> 1234paatasdf.com</a>
              </div>
            </footer>

    )
  }
}

export default footer;
