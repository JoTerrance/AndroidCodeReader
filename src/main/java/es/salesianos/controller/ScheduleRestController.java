package es.salesianos.controller;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import es.salesianos.model.Range;
import es.salesianos.repository.RangeRepository;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@CrossOrigin(origins = { "*", "http://localhost", "http://localhost:3000", "http://127.0.0.1",
		"http://127.0.0.1:3000" })
@RequestMapping(value = "/api")
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ScheduleRestController {

	@GetMapping
	@RequestMapping(value = "/save")
	public ResponseEntity save(@RequestParam String tokenId, @RequestParam String from, @RequestParam String to) {
		LocalTime timeFrom = parseDate(from);
		LocalTime timeTo = parseDate(to);
		Range range = new Range(null, tokenId, timeFrom, timeTo);
		repository.save(range);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping
	@RequestMapping(value = "/delete")
	public ResponseEntity delete(@RequestParam String id) {
		repository.deleteById(Integer.parseInt(id));
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping(value = "/readAll")
	public ResponseEntity<List<Range>> readAll(@RequestParam String tokenId) {
		List<Range> ranges = new ArrayList<Range>();
		ranges.addAll(repository.findAllByTokenid(tokenId));
		log.info(ranges);
		if (!ranges.isEmpty()) {
			return new ResponseEntity<List<Range>>(ranges, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Range>>(ranges, HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping
	@RequestMapping(value = "/isTimeValid")
	public ResponseEntity isValid(@RequestParam String tokenId) {
		setFound(false);
		System.out.println("call is valid");
		List<Range> ranges = repository.findAllByTokenid(tokenId);
		ranges.stream().forEach((range) -> {
			if (LocalTime.now().isAfter(range.getFromTime()) && LocalTime.now().isBefore(range.getToTime())) {
				System.out.println(LocalTime.now().toString() + range);
				setFound(true);
			}
		});
		if (found) {
			return new ResponseEntity(HttpStatus.OK);
		} else {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
	}

	private void setFound(boolean b) {
		found = b;
	}

	private LocalTime parseDate(String to) {
		return LocalTime.parse(to, formatter);
	}

	@Autowired
	RangeRepository repository;
	DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
	private Boolean found;
}
