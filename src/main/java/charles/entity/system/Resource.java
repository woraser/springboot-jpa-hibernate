package charles.entity.system;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

import java.util.List;

import static javax.persistence.GenerationType.TABLE;

/**
 * Created by charles.chen on 2015/7/21.
 */
@Entity
@Table(name = "sys_resource")
public class Resource {

    @Id
    @Column(name = "sys_resource_id")
    @GeneratedValue(strategy = TABLE, generator = "sequence_generator")
    @GenericGenerator(
            name = "sequence_generator",
            strategy = "org.hibernate.id.enhanced.TableGenerator",
            parameters = {
                    @org.hibernate.annotations.Parameter(name = "segment_value", value = "sys"),
                    @org.hibernate.annotations.Parameter(name = "increment_size", value = "100"),
                    @org.hibernate.annotations.Parameter(name = "optimizer", value = "pooled")
            })
    private Long id;

    @Column(name = "sys_resource_name",nullable = false,length = 50)
    private String name;

    @Column(name = "sys_resource_parentId")
    private Long parentId;

    @Column(name = "sys_resource_pKey",length = 50)
    private Long pKey;

    @Column(name = "sys_resource_type",length = 50)
    private Long type;

    @Column(name = "sys_resource_pUrl",length = 200)
    private Long pUrl;

    @Column(name = "sys_resource_level",length = 4)
    private Long level;

    @Column(name = "sys_resource_icon",length = 100)
    private Long icon;

    @Column(name = "sys_resource_ishide")
    private boolean ishide=false;

    @Column(name = "sys_resource_description",length = 200)
    private Long description;

    @ManyToMany(mappedBy = "resources")
    private List<User> user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    public Long getpKey() {
        return pKey;
    }

    public void setpKey(Long pKey) {
        this.pKey = pKey;
    }

    public Long getType() {
        return type;
    }

    public void setType(Long type) {
        this.type = type;
    }

    public Long getpUrl() {
        return pUrl;
    }

    public void setpUrl(Long pUrl) {
        this.pUrl = pUrl;
    }

    public Long getLevel() {
        return level;
    }

    public void setLevel(Long level) {
        this.level = level;
    }

    public Long getIcon() {
        return icon;
    }

    public void setIcon(Long icon) {
        this.icon = icon;
    }

    public boolean isIshide() {
        return ishide;
    }

    public void setIshide(boolean ishide) {
        this.ishide = ishide;
    }

    public Long getDescription() {
        return description;
    }

    public void setDescription(Long description) {
        this.description = description;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }
}
