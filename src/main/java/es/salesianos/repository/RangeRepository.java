package es.salesianos.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import es.salesianos.model.Range;

@Repository("rangeRepository")
public interface RangeRepository extends JpaRepository<Range, Integer> {


	List<Range> findAllByTokenid(String tokenId);

}
