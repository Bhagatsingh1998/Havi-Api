import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

import classes from './Documentation.css';

const Documentation = props => {
  return(
    <React.Fragment>
      <Container>
        <Row>
          <Col className={classes.left}>
            <h3>What this Application is all about?</h3>
            <br />
            <p>It's a appliaction which shows manages persons(both Users and Admins). In order to see the person's which are registered or in order explore the functionalites of this appliaction, user have to signin. To, signin either the user can use exisiting account or register the new account.</p>
            <br />
            <hr />
            <br />
            <h3>Architecture of this webapp</h3>
            <br />
            <p>It's a app build on <strong>React.Js</strong> with help of "creat-react-app". Hence, its a single page application which gives means user doesnt have to wait for the appliaction to load pages while naviagting to differnt routes in this webapp.</p>
            <p> On the backend side it is using the node API server. Sever is build on expressJs for cleaner and better approach. Our API server accepts all the main HTTP verbs(GET, POST, DELETE, PATCH). Hence,it can accept request in any form and data is accepted in JSON (JavaScript Object Notation ) form.
            </p>
            <br />
            <h5>Deep dive on Frontend</h5>
            <p>Our app scripts files are divied into two main parts i.e, <strong>Componenst, Containers</strong>. Make you use of react to te fullest, each part of webpage is divided into more than one part. 
              <ol>
                <li>Containers:
                    <br />
                    Components which are managing some kind of state are within this category. <br />
                    Eg: Some e.g's of state management : 
                    <ol>
                      <li>If user is authenticated</li>
                      <li>If Admin or User edited something</li>
                      <li>User page navigation history</li>
                      <li>And so on...</li>
                    </ol>  
                    Some of the components under this category are : App, Admin, Login, Signin, Signup, Toolbar, User.
                    To the give the feel of MPA(Multi-Page Appliaction ), we have used routing with the help of 'react-router-dom'. <br/>
                    To style wepages, CSS has been used extensively and also made use of 'react-bootstrap' package. <br/>
                    To add icons, 'bootstarp-icons' and 'font-awasome-icons' CDN has been used.
                </li>
                <li>Components:
                  <br/>
                  To keep data flow clean, not all components are used to store the state of the appliaction. Hence, components under 'Components' category are not managing any state, they are just used to display the content.
                  <br />
                  Some of the components under this category are : Documentation, Footer, Logout, Navbar, UserDetails
                </li>
              </ol>
            </p>
            <br />
            
            <h5>Deep dive on Backend</h5>
            <p>
              Our backend is quite lean which deals gives out data in JSON formate whenever any sever tries to connect with our server. In order to prevent CORS (Cross-origin resource sharing) errore, cros package is used which takes care all about cors policies and helps any server to connect with our server. 
              <br />
              JWT token is also setup for more secure connections but its optional for servers to use as we want our API server should be public and anyone can use it without being getting authenticated. 
              <br />
              Sever is extracting API data from MongoDb which is NoSQL Database and exprsee is making use on 'mongoose' package to make efficent queries to MongoDb.
              <br />
              Last not the least, MVC pattern is followed and hence server code is mainly divited into 'Modal' and 'Controller'. Its not having any 'View' section i.e. displaying webpages as it purely deals with sending and reciving JSON data. 
            </p>
            <br/>
            <hr />
            <br />
            <h3>Development of API</h3>
            <br />
            <p>Server is build on REST API's and Rest API's can be used to communicate with our servers. Some of the Rest API routes:
            <ol>
              <li>HTTP VERB: <strong>GET</strong> 
                <ul>
                  <li><p>BASE_URL/user</p>
                    <p>To extract all the users which are present at any given time</p>
                  </li>
                  <li><p>BASE_URL/user/:user_id</p>
                    <p>To extarct the information of one particular person. <i>:user_id</i> stands for unique id for eacch and every person. Hence, its a dyanmic URL. 
                    <br />
                    <strong>Caution:</strong> <i>:user_id</i> will be 20 characters alphanumneric string.
                    </p>
                  </li>
                </ul>
              </li>
              <li>HTTP VERB: <strong> POST</strong>
                <ul>
                  <li><p>BASE_URL/user/login</p>
                    <p>To login, User have pass <u>Email</u> and <u>Password</u>. If the given the values will be correct, 'Auth' token will be setup in webapp.</p>
                  </li>
                  <li><p>BASE_URL/user/signup</p>
                    <p>In order to set up new account, user have to pass couple of parameters compulsory to the above URL. <br />
                    parameters are: <u>Name</u>, <u>Email</u>(it should be unique), <u>UserName</u>, <u>Phone Number</u>, <u>Gender</u>, <u>Avatar Name</u>(Boy, Gentleman, Girl, Gentlewomen), <u>DOB</u>(Date Of Birth), <u>Password</u>, <u>Confirm Password</u> and <u>User Type</u>(User or Admin) </p>
                  </li>
                  <li><p>BASE_URL/user/:user_id</p>
                    <p>Once the user(User Type :  User) is loggedIn. User can add TODO(To Do List). To add TODO, user needs to send request to the above URL with one parameter i.e. <u>Data</u>. <u>Data</u> is nothing but the message of of TODO.</p>
                  </li>
                </ul>
              </li>
              <li>HTTP VERB: <strong> DELETE</strong>
                <ul>
                  <li>BASE_URL/user/:user_id
                    <p>If user is loggedIn as admin i.e. (User Type : Admin). Admin has functionily to delete the person's API from database. To do that admin has to send request to above URL while passing <u>:user_id</u> along with the URL. <br />
                    <strong>Caution:</strong> <i>:user_id</i> will be 20 characters alphanumneric string.
                    </p>
                  </li>
                </ul>
              </li>
              <li>HTTP VERB: <strong> PATCH</strong>
                <ul>
                  <li>BASE_URL/user/:user_id
                    <p>If user is loggedIn as admin i.e. (User Type : Admin). Admin has functionily to edit persons info such as Name, UserName, Phone Number, DOB (Date Of Birth) and Gender. Thus, to make changes to particular person API, request has to be send to teh above URL with any of these parametes: <u>Name</u>, <u>UserName</u>, <u>Phone Number</u>, <u>DOB</u> (Date Of Birth) and <u>Gender</u>.
                    </p> 
                  </li>
                </ul>
              </li>
            </ol>
            <br />
            <hr />
            <br />
            <h3>Credentials</h3>
            <br />
            <ol>
              <li>Admin 1</li>
              <ul>
                <li>Email: admin1@admin.com</li>
                <li>Password: admin</li>
              </ul>
              <li>Admin 2</li>
              <ul>
                <li>Email: admin2@admin.com</li>
                <li>Password: admin</li>
              </ul>
              <li>User 1</li>
              <ul>
                <li>Email: user@user.com</li>
                <li>Password: user</li>
              </ul>
              <li>User 2</li>
              <ul>
                <li>Email: user2@user.com</li>
                <li>Password: user</li>
              </ul>
            </ol>
            <br />
            <hr />
            <br />
            <h3>Versions</h3>
            <br />
            <h4><strong>1.1v</strong>: Current Version</h4>
            <p>
              <ul>
                <li>Limitations</li>
                <ul>
                  <li>Compact documentaion</li>
                  <li>Screen responsiveness not good more mobile size devices </li>
                </ul>
              </ul>
            </p>
            <h4><strong>1.2v</strong>: Upcoming Version</h4>
            <p>
              <ul>
                <li>What's New? </li>
                <ul>
                  <li>More elobrate documentaion</li>
                  <li>Add more screen responsiveness</li>
                  <li>More API routes</li>
                  <li>Making UI more better</li>
                </ul>
              </ul>
            </p>
            </p>
            <br />
            <hr />
            <br />
            <h3>Contact Me</h3>
            <br />
            <h4><strong>Bhagat Singh</strong></h4>
            <p>Freelancer, Full Stack Webdeveloper </p>
            <ol>
              <li>E-Mail: bhagat99198@gmail.com</li>
              <li>LinkedIn Profile: <a href="https://www.linkedin.com/in/bhagat-singh-83502b166/">https://www.linkedin.com/in/bhagat-singh-83502b166/</a></li>
              <li>GitHib Profile : <a href="https://github.com/Bhagatsingh1998">https://github.com/Bhagatsingh1998</a></li>
              <li>Source code of this project : <a href="https://github.com/Bhagatsingh1998/Havi-Api">https://github.com/Bhagatsingh1998/Havi-Api</a></li>
            </ol>
            
            
          </Col>

        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Documentation;