package charles.system.repository;

import charles.entity.system.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by charles.chen on 2015/7/21.
 */
public interface ResourceRepository extends JpaRepository<Resource,Long> {
}
