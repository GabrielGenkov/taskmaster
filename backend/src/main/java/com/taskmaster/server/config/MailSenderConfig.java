package com.taskmaster.server.config;

import freemarker.cache.ClassTemplateLoader;
import freemarker.template.*;
import org.springframework.context.annotation.*;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailSenderConfig {

	@Bean
	public freemarker.template.Configuration freemarkerConfiguration() {
		var cfg = new freemarker.template.Configuration(new Version("2.3.20"));

		cfg.setTemplateLoader(new ClassTemplateLoader(this.getClass(), "/templates"));
		cfg.setDefaultEncoding("UTF-8");
		cfg.setTemplateExceptionHandler(TemplateExceptionHandler.RETHROW_HANDLER);

		return cfg;
	}

}

