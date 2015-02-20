package servlets;

import frontend.Frontend;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.json.simple.JSONObject;

/**
 * @author v.chibrikov
 */

public class Main {
    public static void main(String[] args) throws Exception {
        Frontend frontend = new Frontend();

        JSONObject json = new JSONObject();
        json.put("action", "create_new_user");
        json.put("username", "First_User");
        json.put("password", "firstpassword");
        frontend.parseJson(json);

        Server server = new Server(8080);
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        server.setHandler(context);

        context.addServlet(new ServletHolder(frontend), "/authform");

        server.start();
        server.join();


    }
}
