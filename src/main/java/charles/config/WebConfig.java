package charles.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import java.util.Locale;

/**
 * Created by chenhui on 15/7/22.
 */
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter  {

    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer){

        configurer.enable();
    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:static/login.jsp");
    }





    @Bean
    public InternalResourceViewResolver getInternalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("static/");
        resolver.setSuffix(".jsp");

        return resolver;
    }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages");
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver resolver = new SessionLocaleResolver();
        resolver.setDefaultLocale(Locale.ENGLISH);
        return resolver;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        LocaleChangeInterceptor changeInterceptor = new LocaleChangeInterceptor();
        changeInterceptor.setParamName("language");
        registry.addInterceptor(changeInterceptor);
    }



    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        静态资源
//        registry.addResourceHandler("/pdfs/**").addResourceLocations("/WEB-INF/pdf/");
//        registry.addResourceHandler("/css/**").addResourceLocations("/WEB-INF/css/");
    }



}