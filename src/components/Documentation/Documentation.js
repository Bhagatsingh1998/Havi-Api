import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import classes from './Documentation.css';
import routesImg from '../../assets/images/docs/routes.png';
import errorImg from '../../assets/images/docs/error.png';
import allUsers from '../../assets/images/docs/allusers.png';
import oneUser from '../../assets/images/docs/oneUser.png';
import loginInput from '../../assets/images/docs/loginInput.png';
import loginOutput from '../../assets/images/docs/loginOutput.png';
import signupInput from '../../assets/images/docs/signupInput.png';
import signupOutput from '../../assets/images/docs/signupOutput.png';
import inputTODO from '../../assets/images/docs/inputTODO.png';
import outputTODO from '../../assets/images/docs/outputTODO.png';
import inputPatch from '../../assets/images/docs/inputPatch.png';
import outputPatch from '../../assets/images/docs/outputPatch.png';
import deleteImg from '../../assets/images/docs/deleteImg.png';


const Documentation = props => {
  return(
    <React.Fragment>
      <Container>
        <Row>
          <Col className={classes.left}>
            <h3>What this Application is all about?</h3>
            <br />
            <p>
              It is an application which shows and manages persons(both Users and Admins). In order to see the persons who are registered or to explore the functionalites of this application, user has to SignIn. To SignIn, user can use the existing account and if the user does not have an account, register for an account.
            </p>
            <br />
            <hr />
            <br />
            <h3>Architecture of this webapp</h3>
            <br />
            <p>
              It's an app built on <strong>React.Js</strong> with help of "create-react-app". Hence, its a single page application.Therefore, user doesn't have to wait for the application to load while navigating to different routes in this webapp.
            </p>
            <p> 
              On the backend side it is using the node API server. Server is build on expressJs for cleaner and better approach. Our API server accepts all the main HTTP verbs(GET, POST, DELETE, PATCH). Hence, it can accept request in any form and data is accepted in JSON (JavaScript Object Notation ) form.
            </p>
            <br />
            <h5>Deep dive on Frontend</h5>
            <p>
              Our app scripts files are divied into two main parts i.e, <strong>Components, Containers</strong>. Allows us to use react to it's fullest, each part of webpage is divided into sub-parts. 
              <ol>
                <li>
                  Containers:
                  <br />
                  Components that manage some kind of state fall under this category. <br />
                  Eg: Some e.g's of state management : 
                  <ol>
                    <li>If user is authenticated</li>
                    <li>If Admin or User edits</li>
                    <li>User page navigation history</li>
                    <li>And so on...</li>
                  </ol>  
                  Some of the components under this category are : App, Admin, Login, Signin, Signup, Toolbar, User.
                  To give the feel of MPA(Multi-Page Appliaction ), we have used routing with the help of 'react-router-dom'. <br/>
                  To style webpages, CSS has been used extensively and also made use of 'react-bootstrap' package. <br/>
                  To add icons, 'bootstrap-icons' and 'font-awesome-icons' has been used.
                </li>
                <li>
                  Components:
                  <br/>
                  To keep data flow clean, not all components are used to store the state of the application. Hence, components under 'Components' category are not managing any state, they are just used to display the content.
                  <br />
                  Some of the components under this category are : Documentation, Footer, Logout, Navbar, UserDetails.
                </li>
              </ol>
            </p>
            <br />
            <h5>Deep dive on Backend</h5>
            <p>
              Our backend is quite lean which deals with giving out data in JSON format whenever any server tries to connect with our server. In order to prevent CORS (Cross-origin resource sharing) error, cross package is used which takes care of all the cors policies and helps any server to connect with our server. 
              <br />
              JWT token is also setup for more secure connections but, optional for servers to use as we want our API server should be public and anyone can use it without getting authenticated. 
              <br />
              Sever is extracting API data from MongoDb which is NoSQL Database and express is making use of 'mongoose' package to make efficient queries to MongoDb.
              <br />
              Last but not the least, MVC pattern is followed and hence server code is mainly divided into 'Modal' and 'Controller'. Its not having any 'View' section i.e. displaying webpages as it purely deals with sending and receiving JSON data. 
            </p>
            <br/>
            <hr />
            <br />
            <h3>Development of API</h3>
            <br />
            <p>
              Server is build on REST APIs and Rest APIs can be used to communicate with our servers.
            </p>
            <h5>Rest API routes accepted by our server:-</h5>
            <div className={classes.holder}>
              <img src={routesImg} alt='routes' />
            </div>
            
            <ol>
              <li>
                HTTP VERB: <strong>GET</strong> 
                <ul>
                  <li>
                    <p>BASE_URL/user</p>
                    <p>To extract all the users present at any given time</p>
                  </li>
                  <li>
                    <p>BASE_URL/user/:user_id</p>
                    <p>
                      To extract the information of one particular person. <i>:user_id</i> stands for unique id for each and every person. Hence, it is a dyanmic URL. 
                      <br />
                      <strong>Caution:</strong> <i>:user_id</i> will be 20 characters alphanumneric string.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                HTTP VERB: <strong> POST</strong>
                <ul>
                  <li>
                    <p>BASE_URL/user/login</p>
                    <p>
                      To login, User have to pass <u>Email</u> and <u>Password</u>. If the given the values are correct, 'Auth' token will be setup in webapp.
                    </p>
                  </li>
                  <li>
                    <p>BASE_URL/user/signup</p>
                    <p>
                      In order to set up new account, user have to pass couple of parameters compulsory to the above URL. <br />
                      parameters are: <u>Name</u>, <u>Email</u>(it should be unique), <u>UserName</u>, <u>Phone Number</u>, <u>Gender</u>, <u>Avatar Name</u>(Boy, Gentleman, Girl, Lady), <u>DOB</u>(Date Of Birth), <u>Password</u>, <u>Confirm Password</u> and <u>User Type</u>(User or Admin) 
                    </p>
                  </li>
                  <li>
                    <p>BASE_URL/user/:user_id</p>
                    <p>
                      Once the user(User Type :  User) is loggedIn. User can add TODO(To Do List). To add TODO, user needs to send request to the above URL with one parameter i.e. <u>Data</u>. <u>Data</u> is nothing but the message of TODO.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                HTTP VERB: <strong> DELETE</strong>
                <ul>
                  <li>
                    BASE_URL/user/:user_id                      
                    <p>
                      If user is loggedIn as admin i.e. (User Type : Admin). Admin has functionily to delete the person's API from database. To do that admin has to send request to above URL while passing <u>:user_id</u> along with the URL. <br />
                      <strong>Caution:</strong> <i>:user_id</i> will be 20 characters alphanumneric string.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                HTTP VERB: <strong> PATCH</strong>
                <ul>
                  <li>
                    BASE_URL/user/:user_id
                    <p>
                      If user is loggedIn as admin i.e. (User Type : Admin). Admin has functionily to edit persons' information such as Name, UserName, Phone Number, DOB (Date Of Birth) and Gender. Thus, to make changes to particular person API, request has to be send to the above URL with any of these parametes: <u>Name</u>, <u>UserName</u>, <u>Phone Number</u>, <u>DOB</u> (Date Of Birth) and <u>Gender</u>.
                    </p> 
                  </li>
                </ul>
              </li>
            </ol>
            <p><strong><u>BASE_URL: https://person-api-app.herokuapp.com/</u></strong></p>
            <br />
            <h4> Resquest / Responses</h4>
            <br />
            <p>
              <strong>Request</strong>: GET => https://person-api-app.herokuapp.com/ <br />
              <strong>Response</strong>: Message => "Technical Error. Try after some time." <br /> 
              Thus, whenever user tries to go to invalid route, we will get 404 error. Snippet below gives an error wheb user tries to reach '/' route.
            </p>
            <div className={classes.holder}>
              <img src={errorImg} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: GET => https://person-api-app.herokuapp.com/user <br />
              <strong>Response</strong>: Message => "All Users" <br /> we will get an array containing all the users with there details. Snippet below contains only one user within an array.
            </p>
            <div className={classes.holder}>
              <img src={allUsers} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: GET => https://person-api-app.herokuapp.com/user/user_id <br />
              <strong>Response</strong>: Message => "Valid userId, user found." <br /> We will get the whole information about particular user. Snippet below shows the information about user whose user_id = a061d3500043bbb48
            </p>
            <div className={classes.holder}>
              <img src={oneUser} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: POST => https://person-api-app.herokuapp.com/user/login <br />
              <strong>Response</strong>: Message => "LoggedIn" <br /> Inorder to login, we have to pass email and password as JSON data. Snippet below shows the input data.
            </p>
            <div className={classes.holder}>
              <img src={loginInput} alt='routes' />
            </div>
            <p>
              Depending upon the inputs given, we will get appropriate message. Snip below is for correct inputs.
            </p>
            <div className={classes.holder}>
              <img src={loginOutput} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: POST => https://person-api-app.herokuapp.com/user/signup <br />
              <strong> Response</strong> Message => "User saved in database". <br /> Inorder to make the user signup we need to pass couple of values as compulsary parameters in JSON form. Beloow is the snippet of input values for signing up process.
            </p>
            <div className={classes.holder}>
              <img src={signupInput} alt='routes' />
            </div>
            <p>
              Once successfully passing the parameters we should get appropriate message. Below is the snip of output which we get after passing teh input values.
            </p>
            <div className={classes.holder}>
              <img src={signupOutput} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: POST => https://person-api-app.herokuapp.com/user/user_id<br />
              <strong>Response</strong>: Message => "TODO saved" <br /> User can add the the TODO list by making POST request on above route. In the snippet below TODO has been added to user name 'Alex' whose user_id = 5f57adb5061d3500043bbb4b. Below is the input snippet.
            </p>
            <div className={classes.holder}>
              <img src={inputTODO} alt='routes' />
            </div>
            <br />
            <p>Once the TODO mesage has been sent successfully, we should output as shown below</p>
            <div className={classes.holder}>
              <img src={outputTODO} alt='routes' />
            </div>
            <p>
              <strong>Request</strong>: PATCH => https://person-api-app.herokuapp.com/user/user_id <br />
              <strong>Response</strong>: Message =>"Valid userId, user details updated." <br /> While signinup, if usered eneted wrong credentials, those credentials can esaily be corrected by send the PATCH to the target user bu passing its user_id in the above URL. Below snip is targeting the user name "Alex" whose user_id = 5f57adb5061d3500043bbb4b. Below is the input value snip. 
            </p>
            <div className={classes.holder}>
              <img src={inputPatch} alt='routes' />
            </div>
            <p>If the values are passed successfully, we should get output as shown below in snippet</p>
            <div className={classes.holder}>
              <img src={outputPatch} alt='routes' />
            </div>
            <br />
            <p>
              <strong>Request</strong>: DELETE => https://person-api-app.herokuapp.com/user/user_id<br />
              <strong>Response</strong>: Message => Valid userId, user deleted successfully."<br /> Delting the user api from the server is possible by just sending DELETE method by passing the particular user_id. Here we are passing user_id = "5f57bdfec3ee2000047c191c". Once the user api is deleted, we will following output as show below
            </p>
            <div className={classes.holder}>
              <img src={deleteImg} alt='routes' />
            </div>
            <br />
            <h4>Conclution</h4>
            <p>With every JSON response, we will following key's</p>
            <ul>
              <li>statusCode => Gives status code : 200 | 201 | 301 | 404 | 500</li>
              <li>status => Gives status : Success | Error</li>
              <li>message => Any appropriate message</li>
              <li>userDetails => if user is present, its details will be there else null</li>
              <li>request
                <ol>
                  <li>url => Target URL where request was passed</li>
                  <li>verb => Method of the target request</li>
                </ol>
              </li>

            </ul>
            <br />
            <hr />
            <br />
            <h3>Credentials</h3>
            <br />
            <ol>
              <li>Admin 1</li>
              <ul>
                <li>Email: admin1@admin.com</li>
                <li>Password: admin1</li>
              </ul>
              <li>Admin 2</li>
              <ul>
                <li>Email: admin2@admin.com</li>
                <li>Password: admin2</li>
              </ul>
              <li>User 1</li>
              <ul>
                <li>Email: user1@user.com</li>
                <li>Password: user11</li>
              </ul>
              <li>User 2</li>
              <ul>
                <li>Email: user2@user.com</li>
                <li>Password: user22</li>
              </ul>
            </ol>
            <br />
            <hr />
            <br />
            <h3>Versions</h3>
            <br />
            <h4><strong>1.1v</strong></h4>
            <p>
              <ul>
                <li>Limitations</li>
                <ul>
                  <li>Compact documentation.</li>
                  <li>Screen responsiveness not good for more variation in mobile-size devices. </li>
                </ul>
              </ul>
            </p>
            <h4><strong>1.2v</strong>: Current Version</h4>
            <p>
              <ul>
                <li>What's New? </li>
                <ul>
                  <li>More elaborate documentation.</li>
                  <li>Add more screen responsiveness.</li>
                  
                  <li>Making UI much better.</li>
                </ul>
              </ul>
            </p>
            <h4><strong>1.3v</strong>: Upcoming Version</h4>
            <p>
              <ul>
                <li>What  yet to come? </li>
                <ul>
                  <li>More API routes.</li>
                  <li>More better UI  with animations</li>
                  <li>Reducing the size of total application by more optimizing it</li>
                </ul>
              </ul>
            </p>
            <br />
            <hr />
            <br />
            <h3>Contact Me</h3>
            <br />
            <h4><strong>Bhagat Singh</strong></h4>
            <p>Freelancer || Full Stack Webdeveloper </p>
            <ol>
              <li>E-Mail: bhagat99198@gmail.com</li>
              <li>
                LinkedIn Profile: <a href="https://www.linkedin.com/in/bhagat-singh-83502b166/">https://www.linkedin.com/in/bhagat-singh-83502b166/</a>
              </li>
              <li>
                GitHib Profile : <a href="https://github.com/Bhagatsingh1998">https://github.com/Bhagatsingh1998</a>
              </li>
              <li>
                Source code of this project : <a href="https://github.com/Bhagatsingh1998/Havi-Api">https://github.com/Bhagatsingh1998/Havi-Api</a>
              </li>
            </ol>
            <br />
            <br />
            <br />
            <hr />
            <p style={{textAlign: 'center'}} > 🎉🎉 Thanks 🎉🎉 </p>
            <br/>
            <hr/>
            <hr/>
            <br />
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Documentation;