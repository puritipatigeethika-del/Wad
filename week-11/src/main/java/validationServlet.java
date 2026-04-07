

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;

/**
 * Servlet implementation class validationServlet
 */
@WebServlet("/validationServlet")
public class validationServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String URL = "jdbc:mysql://localhost:3306/db";
	private static final String USER = "root";
	private static final String PASSWORD = "admin";
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public validationServlet() {
        super();
        // TODO Auto-generated constructor stub
    } 	

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        //response.setContentType("text/html");
        //response.getWriter().println("<h3>Please submit the form from index.html</h3>");
    }

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String name = request.getParameter("name");
        //String ageStr = request.getParameter("age");
        String email = request.getParameter("email");

        // ----------- VALIDATION --------------

        if (name == null || name.trim().isEmpty()) {
            out.println("<h3 style='color:red;'>Name cannot be empty!</h3>");
            return;
        }

        //if (ageStr == null || ageStr.trim().isEmpty()) {
           // out.println("<h3 style='color:red;'>Age cannot be empty!</h3>");
            //return;
       // }

        //int age = 0;
        //try {
           // age = Integer.parseInt(ageStr);
           // if (age <= 0) {
            //    out.println("<h3 style='color:red;'>Age must be positive number!</h3>");
             //   return;
           // }
       // } catch (NumberFormatException e) {
          //  out.println("<h3 style='color:red;'>Age must be a valid number!</h3>");
          //  return;
      //  }

        if (email == null || !email.contains("@") || !email.contains(".")) {
            out.println("<h3 style='color:red;'>Invalid email format!</h3>");
            return;
        }

        // ----------- DATABASE INSERT -------------

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection con = DriverManager.getConnection(URL, USER, PASSWORD);

            String sql = "INSERT INTO students(name, email) VALUES (?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, name);
            //ps.setInt(2, age);
            ps.setString(2, email);

            int rows = ps.executeUpdate();

            if (rows > 0) {
                out.println("<h3 style='color:green;'>Student Added Successfully!</h3>");
            } else {
                out.println("<h3 style='color:red;'>Insert Failed!</h3>");
            }

            con.close();

        } catch (Exception e) {
            e.printStackTrace();
            out.println("<h3 style='color:red;'>Database Error: " 
                        + e.getMessage() + "</h3>");
        }
    }

}
