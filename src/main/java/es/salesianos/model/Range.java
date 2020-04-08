package es.salesianos.model;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Range")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Range {

	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer id;
	private String tokenid;
	private LocalTime fromTime;
	private LocalTime toTime;

}
