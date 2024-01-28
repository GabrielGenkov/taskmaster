package com.taskmaster.server.domain.mail;

import freemarker.template.*;
import java.io.*;
import java.util.Map;
import javax.mail.MessagingException;
import org.springframework.beans.factory.annotation.*;
import org.springframework.mail.javamail.*;
import org.springframework.stereotype.Service;

@Service
public class MailService {

	private final JavaMailSender mailSender;

	private final String from;

	private final String fromName;

	private final Configuration templateConfig;

	public MailService(
		JavaMailSender mailSender,
		@Value("${spring.mail.username}") String from, @Value("Test Testov") String fromName, @Qualifier("freemarkerConfiguration") Configuration templateConfig) {
		this.mailSender = mailSender;
		this.from = from;
		this.fromName = fromName;
		this.templateConfig = templateConfig;
	}

	public void send(String recipient, String subject, String content, String cc, String bcc) throws MessagingException, UnsupportedEncodingException {
		var mimeMessage = this.mailSender.createMimeMessage();
		var helper = new MimeMessageHelper(
			mimeMessage,
			false,
			"utf-8"
		);

		mimeMessage.setContent(content, "text/html; charset=UTF-8");
		helper.setFrom(this.from, this.fromName);
		helper.setTo(recipient);
		helper.setSubject(subject);
		if (cc != null) {
			helper.setCc(cc);
		}
		if (bcc != null) {
			helper.setBcc(bcc);
		}

		this.mailSender.send(mimeMessage);
	}

	public void send(String recipient, String subject, String templateName, Object model, String cc, String bcc) throws IOException, TemplateException, MessagingException {
		var template = this.templateConfig.getTemplate(templateName);
		var writer = new StringWriter();
		var env = template.createProcessingEnvironment(Map.of("model", model), writer);
		env.setOutputEncoding("UTF-8");
		env.process();
		var content = writer.toString();

		this.send(recipient, subject, content, cc, bcc);
	}

	public void send(String recipient, String subject, Object model, String cc, String bcc) throws IOException, TemplateException, MessagingException {
		this.send(recipient, subject, model.getClass().getSimpleName() + ".ftlh", model, cc, bcc);
	}

	public void send(String recipient, String subject, Object model) throws IOException, TemplateException, MessagingException {
		this.send(recipient, subject, model, null, null);
	}

	public void send(String recipient, String subject, String templateName, Object model) throws IOException, TemplateException, MessagingException {
		this.send(recipient, subject, templateName, model, null, null);
	}

	public void send(String recipient, String subject, String content) throws MessagingException, UnsupportedEncodingException {
		this.send(recipient, subject, content, null, null);
	}

}
