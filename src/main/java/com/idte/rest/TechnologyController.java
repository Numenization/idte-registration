package com.idte.rest;

import java.io.File;
import java.io.FileOutputStream;
import java.security.Principal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.idte.rest.data.Error;
import com.idte.rest.data.Technology;
import com.idte.rest.data.TechnologyCategory;
import com.idte.rest.data.TechnologyCategoryRepository;
import com.idte.rest.data.TechnologyRepository;

import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;

@RestController
@RequestMapping
public class TechnologyController {
  @Autowired
  private JavaMailSender javaMailSender;
  @Autowired
  private TechnologyRepository technologies;
  @Autowired
  private TechnologyCategoryRepository categories;

  @GetMapping(path="/technologies/all", produces = "application/json")
  public Iterable<Technology> findAllTechnologies() {
    return technologies.findAll();
  }

  @GetMapping(path="/technologyCategories/all", produces = "application/json")
  public Iterable<TechnologyCategory> findAllTechnologyCategories() {
    return categories.findAll();
  }

  @GetMapping(path="/admin/technologies", consumes = "application/json", produces = "application/json")
  public Object findTechnology(@RequestBody Map<String, String> json) {
    Technology find = new Technology();
    if(json.get("id") != null) {
      try {
        find.setId(Integer.parseInt(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    if(json.get("title") != null) {
      find.setTitle(json.get("title"));
    }
    Example<Technology> example = Example.of(find);
    Technology technology = technologies.findOne(example).orElse(null);
    if(technology != null) {
      return new ResponseEntity<>(technology, HttpStatus.OK);
    }
    else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping(path = "/admin/technologies", consumes = "application/json", produces = "application/json")
  public Object createTechnology(@RequestBody Map<String,String> json) {
    Technology newTech = new Technology();

    newTech.setCategory(json.get("category"));
    newTech.setTitle(json.get("title"));
    newTech.setDescription(json.get("description"));
    newTech.setType(json.get("type"));
    newTech.setShippingCity(json.get("shippingCity"));
    newTech.setSource(json.get("shippingCountry"));
    newTech.setFordContact(json.get("fordContact"));
    newTech.setFordPresenter(json.get("fordPresenter"));
    newTech.setDirector(json.get("director"));
    newTech.setSupplierCompany(json.get("supplierCompany"));
    newTech.setComments("");
    newTech.setModifiedBy("");
    

    Technology uniqueTest = new Technology();
    uniqueTest.setTitle(newTech.getTitle());
    Example<Technology> example = Example.of(uniqueTest);
    if(technologies.findOne(example).orElse(null) != null) {
      return new ResponseEntity<>(new Error("Entity with title " + uniqueTest.getTitle() + " already exists!"), HttpStatus.CONFLICT);
    }

    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newTech.setDateCreated(currentDateTime);
    newTech.setLastModified(currentDateTime);
    try {
      System.out.println(newTech);
      return new ResponseEntity<>(technologies.save(newTech), HttpStatus.OK);
    }
    catch(Exception e) {
      System.out.println(e);
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PostMapping(path = "/admin/technologies/search")
  public Object techSearch(@RequestBody Map<String, String> json) {

    String search = json.get("search");
    List<String> attributes = Arrays.asList("type", "category", "description", "director", "fordContact", "fordPresenter",
        "shippingCity", "shippingCountry", "source","supplerCompany", "title");

    List<Technology> technology = technologies
        .findAll(Specification.where(TechnologyRepository.containsTextInAttributes(search, attributes)));
    return new ResponseEntity<>(technology, HttpStatus.OK);
  }

  @PutMapping(path = "/admin/technologies", consumes = "application/json", produces = "application/json")
  public Object updateTechnology(Principal principal, @RequestBody Map<String, String> json) {
    int testId = -1;
    try {
      System.out.println(json.get("id"));
      testId = Integer.parseInt(json.get("id"));
    }
    catch(Exception e) {
      return new ResponseEntity<>(new Error("Invalid ID in PUT request"), HttpStatus.INTERNAL_SERVER_ERROR);
    }
    if(testId == -1) {
      return new ResponseEntity<>(new Error("Invalid ID in PUT request"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    Technology testTech = new Technology();
    testTech.setId(testId);
    Example<Technology> example = Example.of(testTech);
    Technology technology = technologies.findOne(example).orElse(null);
    if(technology == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    boolean changes = false;

    String title = json.get("title");
    String description = json.get("description");
    String type = json.get("type");
    String shippingCity = json.get("shippingCity");
    String shippingCountry = json.get("shippingCountry");
    String source = json.get("source");
    String fordContact = json.get("fordContact");
    String fordPresenter = json.get("fordPresenter");
    String director = json.get("director");
    String supplierCompany = json.get("supplierCompany");
    String comments = json.get("comments");

    if(title != null && !title.equals(technology.getTitle())) {
      technology.setTitle(title);
      changes = true;
    }
    if(description != null && !description.equals(technology.getDescription())) {
      technology.setDescription(description);
      changes = true;
    }
    if(type != null && !type.equals(technology.getType())) {
      technology.setType(type);
      changes = true;
    }
    if(shippingCity != null && !shippingCity.equals(technology.getShippingCity())) {
      technology.setShippingCity(shippingCity);
      changes = true;
    }
    if(shippingCountry != null && !shippingCountry.equals(technology.getShippingCountry())) {
      technology.setShippingCountry(shippingCountry);
      changes = true;
    }
    if(source != null && !source.equals(technology.getSource())) {
      technology.setSource(source);
      changes = true;
    }
    if(fordContact != null && !fordContact.equals(technology.getFordContact())) {
      technology.setFordContact(fordContact);
      changes = true;
    }
    if(fordPresenter != null && !fordPresenter.equals(technology.getFordPresenter())) {
      technology.setFordPresenter(fordPresenter);
      changes = true;
    }
    if(director != null && !director.equals(technology.getDirector())) {
      technology.setDirector(director);
      changes = true;
    }
    if(supplierCompany != null && !supplierCompany.equals(technology.getSupplierCompany())) {
      technology.setSupplierCompany(supplierCompany);
      changes = true;
    }
    if(comments != null && !comments.equals(technology.getComments())) {
      technology.setComments(comments);
      changes = true;
    }

    if(changes) {
      DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
      Date date = new Date();
      String currentDateTime = dateFormat.format(date);
      technology.setLastModified(currentDateTime);
      technology.setModifiedBy(principal.getName());

      technologies.save(technology);
      return new ResponseEntity<>(HttpStatus.OK);
    }
    else {
        return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
    }
  }

  @DeleteMapping(path = "/admin/technologies")
  public Object deleteTechnology(@RequestBody Map<String, String> json) {
    Technology find = new Technology();
    if(json.get("id") != null) {
      try {
        find.setId(Integer.parseInt(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    Example<Technology> example = Example.of(find);
    Technology technology = technologies.findOne(example).orElse(null);

    if(technology == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    technologies.delete(technology);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping(path = "/admin/technologyCategories", consumes = "application/json", produces = "application/json")
  public Object createTechnologyCategory(@RequestBody String category) {
    String categoryString = category.replaceAll("^\"|\"$", "");
    TechnologyCategory newCategory = new TechnologyCategory(categoryString);

    try {
      return new ResponseEntity<>(categories.save(newCategory), HttpStatus.OK);
    }
    catch(Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping(path = "/admin/technologyCategories", consumes = "application/json", produces = "application/json")
  public Object deleteTechnologyCategory(@RequestBody Map<String, String> json) {
    TechnologyCategory find = new TechnologyCategory();
    if(json.get("id") != null) {
      try {
        find.setId(Integer.parseInt(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    Example<TechnologyCategory> example = Example.of(find);
    TechnologyCategory category = categories.findOne(example).orElse(null);

    if(category == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    categories.delete(category);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping(path = "/admin/technologyCategories", consumes = "application/json", produces = "application/json")
  public Object getTechnologyCategory(@RequestBody Map<String, String> json) {
    TechnologyCategory find = new TechnologyCategory();
    if(json.get("id") != null) {
      try {
        find.setId(Integer.parseInt(json.get("id")));
      }
      catch(Exception e) {
        return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    Example<TechnologyCategory> example = Example.of(find);
    TechnologyCategory category = categories.findOne(example).orElse(null);

    if(category == null) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(category, HttpStatus.OK);
  }

  // path for normal users to get the list of technologies by their id, to hide info from other users
  @GetMapping(path = "/technologies", consumes = "application/json", produces = "application/json")
  public Object getTechnologyIds() {
    Iterable<Technology> techs = technologies.findAll();
    List<String> ids = new ArrayList<>();

    for(Technology tech: techs) {
      ids.add(tech.getId() + "");
    }

    Map<String, List<String>> json = new HashMap<>();
    json.put("status", ids);

    return new ResponseEntity<>(json, HttpStatus.OK);
  }

  // this is the path that normal users will take to submit their technologies
  @PostMapping(path = "/technologies", consumes = "application/json", produces = "application/json")
  public Object submitTechnology(@RequestBody Map<String, String> json) {
    Technology newTech = new Technology();
    List<Error> errors = new ArrayList<>();
    
    String category = json.get("category");
    String title = json.get("title");
    String description = json.get("description");
    String type = json.get("type");
    String shippingCity = json.get("shippingCity");
    String shippingCountry = json.get("shippingCountry");
    String fordContact = json.get("fordContact");
    String fordPresenter = json.get("fordPresenter");
    String director = json.get("director");
    String supplierCompany = json.get("supplierCompany");
    String source = json.get("source");
    String email = json.get("email");

    newTech.setComments("");
    newTech.setModifiedBy("");

    if(category == null || title == null || description == null || 
      type == null || shippingCity == null || shippingCountry == null || 
      fordContact == null || fordPresenter == null || director == null || 
      supplierCompany == null || source == null ||
      category.length() == 0 || title.length() == 0 || description.length() == 0 || 
      type.length() == 0 || shippingCity.length() == 0 || shippingCountry.length() == 0 || 
      fordContact.length() == 0 || fordPresenter.length() == 0 || director.length() == 0 || 
      supplierCompany.length() == 0 || source.length() == 0) {
        errors.add(new Error("Make sure all fields are filled out!"));
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    newTech.setCategory(category);
    newTech.setTitle(title);
    newTech.setDescription(description);
    newTech.setType(type);
    newTech.setShippingCity(shippingCity);
    newTech.setShippingCountry(shippingCountry);
    newTech.setFordContact(fordContact);
    newTech.setFordPresenter(fordPresenter);
    newTech.setDirector(director);
    newTech.setSupplierCompany(supplierCompany);
    newTech.setSource(source);

    if(technologies.findByTitle(title) != null) {
      errors.add(new Error("Entity with title " + title + " already exists!"));
      return new ResponseEntity<>(errors, HttpStatus.CONFLICT);
    }

    DateFormat dateFormat = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
    Date date = new Date();
    String currentDateTime = dateFormat.format(date);
    newTech.setDateCreated(currentDateTime);
    newTech.setLastModified(currentDateTime);

    try {
      technologies.save(newTech);
    }
    catch(Exception e) {
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // CONFIRMATION EMAIL

    new Thread(() -> {sendEmail(email);}, "Email-Thread").start();

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @Async
  public void sendEmail(String email) {
    SimpleMailMessage msg = new SimpleMailMessage();

    msg.setTo(email);
    msg.setSubject("Ford IDTE: Tech submission confirmation");
    msg.setText("Thank you for your submission");
    javaMailSender.send(msg);
  }

  @GetMapping(path = "/admin/technologyExcel.xlsx", produces = "application/excel")
  public Object exportAttendeesExcel() {
    XSSFWorkbook workbook = buildExcelDocument();
    DateFormat dateFormat = new SimpleDateFormat("MMddyyyyHHmmss");
    Date date = new Date();
    String fileName = dateFormat.format(date) + "technologies.xlsx";
    try {
      File dir = new File("excelExports");
      if(!dir.exists()) {
        dir.mkdir();
      }
      FileOutputStream out = new FileOutputStream(new File("excelExports/" + fileName));
      workbook.write(out);
      out.close();
      workbook.close();
      return new FileSystemResource("excelExports/" + fileName);
    } catch(Exception e) {
      e.printStackTrace();
      return new ResponseEntity<>(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  protected XSSFWorkbook buildExcelDocument() {
    XSSFWorkbook workbook = new XSSFWorkbook();
    XSSFSheet sheet = workbook.createSheet("Technologies");

    List<Technology> techs = technologies.findAll();

    XSSFRow header = sheet.createRow(0);
    header.createCell(0).setCellValue("Technology ID");
    header.createCell(1).setCellValue("Title");
    header.createCell(2).setCellValue("Description");
    header.createCell(3).setCellValue("Category");
    header.createCell(4).setCellValue("Type");
    header.createCell(5).setCellValue("Shipping City");
    header.createCell(6).setCellValue("Shipping Country");
    header.createCell(7).setCellValue("Supplier Company");
    header.createCell(8).setCellValue("Source");
    header.createCell(9).setCellValue("Ford Contact");
    header.createCell(10).setCellValue("Ford Presenter");
    header.createCell(11).setCellValue("Director");
    header.createCell(12).setCellValue("Comments");
    header.createCell(13).setCellValue("Date Created");
    header.createCell(14).setCellValue("Date Last Modified");
    header.createCell(15).setCellValue("Last Modified By");

    int rowNum = 0;

    for(Technology tech: techs) {
      XSSFRow row = sheet.createRow(++rowNum);
      row.createCell(0).setCellValue(tech.getId());
      row.createCell(1).setCellValue(tech.getTitle());
      row.createCell(2).setCellValue(tech.getDescription());
      row.createCell(3).setCellValue(tech.getCategory());
      row.createCell(4).setCellValue(tech.getType());
      row.createCell(5).setCellValue(tech.getShippingCity());
      row.createCell(6).setCellValue(tech.getShippingCountry());
      row.createCell(7).setCellValue(tech.getSupplierCompany());
      row.createCell(8).setCellValue(tech.getSource());
      row.createCell(9).setCellValue(tech.getFordContact());
      row.createCell(10).setCellValue(tech.getFordPresenter());
      row.createCell(11).setCellValue(tech.getDirector());
      row.createCell(12).setCellValue(tech.getComments());
      row.createCell(13).setCellValue(tech.getDateCreated());
      row.createCell(14).setCellValue(tech.getLastModified());
      row.createCell(15).setCellValue(tech.getModifiedBy());
    }

    try {
      return workbook;
    }
    catch(Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}