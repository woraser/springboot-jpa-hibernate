package charles.system.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by chenhui on 15/7/21.
 */
@Controller
@RequestMapping("/")
public class systemController {

    @RequestMapping(value="hehe",method= RequestMethod.GET)
    public String hehe(){

        return "hehe";
    }

    @RequestMapping(value="login",method= RequestMethod.GET)
    public String index(){

        return "login";
    }

}
